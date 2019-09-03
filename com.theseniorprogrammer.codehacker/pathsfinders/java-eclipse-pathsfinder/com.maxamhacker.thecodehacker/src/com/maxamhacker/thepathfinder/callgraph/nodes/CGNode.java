package com.maxamhacker.thepathfinder.callgraph.nodes;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.jdt.internal.core.CompilationUnit;
import org.eclipse.jdt.internal.core.CompilationUnitElementInfo;
import org.eclipse.jdt.internal.core.CompilationUnitStructureRequestor;
import org.eclipse.jdt.internal.core.JavaElement;
import org.eclipse.jdt.internal.core.JavaProject;
import org.eclipse.jdt.internal.core.SearchableEnvironment;
import org.eclipse.jdt.internal.core.SourceType;
import org.eclipse.jdt.internal.core.SourceTypeElementInfo;
import org.eclipse.jdt.internal.compiler.CompilationResult;
import org.eclipse.jdt.internal.compiler.DefaultErrorHandlingPolicies;
import org.eclipse.jdt.internal.compiler.IProblemFactory;
import org.eclipse.jdt.internal.compiler.SourceElementParser;
import org.eclipse.jdt.internal.compiler.ast.CompilationUnitDeclaration;
import org.eclipse.jdt.internal.compiler.env.AccessRestriction;
import org.eclipse.jdt.internal.compiler.env.IBinaryType;
import org.eclipse.jdt.internal.compiler.env.INameEnvironment;
import org.eclipse.jdt.internal.compiler.env.ISourceType;
import org.eclipse.jdt.internal.compiler.impl.CompilerOptions;
import org.eclipse.jdt.internal.compiler.impl.ITypeRequestor;
import org.eclipse.jdt.internal.compiler.lookup.LookupEnvironment;
import org.eclipse.jdt.internal.compiler.lookup.PackageBinding;
import org.eclipse.jdt.internal.compiler.lookup.CompilationUnitScope;
import org.eclipse.jdt.internal.compiler.parser.SourceTypeConverter;
import org.eclipse.jdt.internal.compiler.problem.DefaultProblemFactory;
import org.eclipse.jdt.internal.compiler.problem.ProblemReporter;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import com.maxamhacker.thepathfinder.PFCompilationUnitStructureRequestor;
import com.maxamhacker.thepathfinder.callgraph.CGNodeVisitor;
import com.maxamhacker.thepathfinder.drawing.LayoutNode;

@SuppressWarnings("restriction")
public class CGNode {
	
	public static HashMap<String, CGNode> pathNodes = new HashMap<String, CGNode>();
	private static int nodesCounter = 0;
	
	private String name;
	private String methodId;
	private CGNode parent;
	private CGNode[] children;
	private String[] arguments;
	private int number;
	private int capacity;
	private CompilationUnit cu;
	private CompilationUnitDeclaration cuDeclaration;
	private CompilerOptions compilerOptions;
	private boolean visited;
	private boolean hasError;
	private int nodeId;
	
	public CGNode() {
		this.number = 0;
		this.capacity = 10;
		this.children = new CGNode[this.capacity];
		this.nodeId = nodesCounter ++;
		this.arguments = new String[0];
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setMethodId(String methodId) {
		this.methodId = methodId;
	}
	
	public String getMethodId() {
		return this.methodId;
	}
	
	public int getNodeId() {
		return this.nodeId;
	}
	
	public CGNode[] getChildren() {
		return this.children;
	}
	
	public void setParent(CGNode node) {
		this.parent = node;
	}
	
	public CGNode getParent() {
		return this.parent;
	}
	
	public int getNumber() {
		return this.number;
	}
	
	public String[] getArguments() {
		return this.arguments;
	}
	
	public void setArguments(String[] arguments) {
		this.arguments = arguments;
	}
		
	public void addChild(CGNode node) {
		
		if (node == null)
			return;
		
		this.number += 1;
		if (this.number > this.capacity) {
			this.capacity += 3;
			this.children = Arrays.copyOf(this.children, this.capacity);
		}
		this.children[this.number - 1] = node;
		node.setParent(this);
	}
	
	public void setCompilationUnit(CompilationUnit cu) {
		this.cu = cu;
	}
	
	public void compileAndResolve() {
		if (this.cu == null) return;

		IJavaProject project = this.cu.getJavaProject();
		CompilationUnitElementInfo unitInfo = new CompilationUnitElementInfo();
		HashMap newElements = new HashMap();
		CompilationUnitStructureRequestor requestor = new PFCompilationUnitStructureRequestor(this.cu, unitInfo, newElements);
		IProblemFactory problemFactory = new DefaultProblemFactory();
		Map options = project == null ? JavaCore.getOptions() : project.getOptions(true);
		this.compilerOptions = new CompilerOptions(options);
		this.compilerOptions.ignoreMethodBodies = false;
		SourceElementParser parser = new SourceElementParser(requestor, problemFactory, this.compilerOptions, true, true);
		
		CompilationUnit source = this.cu.cloneCachingContents();
		IProgressMonitor pm = new NullProgressMonitor();
		try {
			this.cuDeclaration = parser.parseCompilationUnit(source, true, pm);
		} catch (Exception e0) {
			try {
				CompilationResult compilationResult = new CompilationResult(this.cu, 1, 0, 10);
				this.cuDeclaration = parser.dietParse(source, compilationResult);
			} catch (Exception e1) {
				this.hasError = true;
				return;
			}
		}
		
		ProblemReporter problemReporter = new ProblemReporter(
				DefaultErrorHandlingPolicies.proceedWithAllProblems(),
				this.compilerOptions,
				problemFactory);
		ICompilationUnit[] workingCopies = { this.cu };
		INameEnvironment nameEnvironment = null;
		LookupEnvironment lookupEnvironment = null;
		try {
			nameEnvironment = new SearchableEnvironment((JavaProject)project, workingCopies, true);
			lookupEnvironment =
					new LookupEnvironment(new ITypeRequestor() {
						@Override
						public void accept(IBinaryType binaryType, PackageBinding packageBinding, AccessRestriction accessRestriction) {
							packageBinding.environment.createBinaryTypeFrom(binaryType, packageBinding, accessRestriction);
						}
						@Override
						public void accept(org.eclipse.jdt.internal.compiler.env.ICompilationUnit unit, AccessRestriction accessRestriction) {
							return;
						}
						@Override
						public void accept(ISourceType[] sourceTypes, PackageBinding packageBinding, AccessRestriction accessRestriction) {
							CompilationResult result = null;
							SourceTypeElementInfo sourceType;
							if (sourceTypes[0].getEnclosingType() != null) {
								try {
									if (sourceTypes[0] instanceof SourceType) {
										sourceType = (SourceTypeElementInfo) ((SourceType) sourceTypes[0]).getElementInfo();
									} else {
										sourceType = (SourceTypeElementInfo) sourceTypes[0];
									}
									IType[] types = sourceType.getHandle().getCompilationUnit().getTypes();
									sourceTypes = new ISourceType[types.length];
									sourceTypes[0] = sourceType;
									int length = types.length;
									for (int i = 0; i < length; i++) {
										ISourceType otherType =
											(ISourceType) ((JavaElement) types[i]).getElementInfo();
										sourceTypes[i] = otherType;
									}
									ISourceType otherType =
											(ISourceType) ((JavaElement) types[0]).getElementInfo();
									result = new CompilationResult(otherType.getFileName(), 1, 1, compilerOptions.maxProblemsPerUnit);
								} catch (JavaModelException e) {
									// Unlikely to reach here as the elements have already been opened in NameLookup.
								}
							} else {
								result = new CompilationResult(sourceTypes[0].getFileName(), 1, 1, compilerOptions.maxProblemsPerUnit);
							}
							LookupEnvironment environment = packageBinding.environment;
							CompilationUnitDeclaration unit =
								SourceTypeConverter.buildCompilationUnit(
									sourceTypes,
									SourceTypeConverter.FIELD_AND_METHOD
									| SourceTypeConverter.MEMBER_TYPE,
									environment.problemReporter,
									result);

							if (unit != null) {
								environment.buildTypeBindings(unit, accessRestriction);
								environment.completeTypeBindings(unit, true);
							}
						}
					}, this.compilerOptions, problemReporter, nameEnvironment);
				
			lookupEnvironment.buildTypeBindings(this.cuDeclaration, null);
			lookupEnvironment.completeTypeBindings(this.cuDeclaration, true);
			parser.getMethodBodies(this.cuDeclaration);
			if (this.cuDeclaration.scope != null)
				this.cuDeclaration.scope.faultInTypes();
		} catch (Exception e ) {
			this.cuDeclaration.cleanUp();
		} finally {
			try {
				this.cuDeclaration.resolve();
			} catch (Exception e) {
				this.hasError = true;
			}
		}

	}

	public void traverseAndFindCalls(String methodName) {
		if (this.cuDeclaration == null)
			return;
		this.cuDeclaration.ignoreFurtherInvestigation = false;
		this.cuDeclaration.traverse(
				new ASTMethodsFinder(this, methodName), 
				new CompilationUnitScope(this.cuDeclaration, this.compilerOptions));

	}
	
	public void createMethodFromTheCall() {
		if (this.cu == null)
			return;
		if (pathNodes.get(this.methodId) == null) {
			CGMethod methodForTheCall = new CGMethod();
			methodForTheCall.setName(getName());
			methodForTheCall.setMethodId(this.methodId);
			methodForTheCall.setCompilationUnit(this.cu);
			methodForTheCall.setArguments(this.arguments);
			addChild(methodForTheCall);
		}
	}
	
	public void accept(CGNodeVisitor visitor) {
		acceptChildren(visitor);
	}
	
	public void acceptChildren(CGNodeVisitor visitor) {
		for (int idx = 0; idx < this.number; idx ++) {
			this.children[idx].accept(visitor);
		}
	}
	
	public void setVisited() {
		this.visited = true;
	}
	
	public void clearVisited() {
		this.visited = false;
	}
	
	public boolean isVisited() {
		return this.visited == true;
	}
	
}
