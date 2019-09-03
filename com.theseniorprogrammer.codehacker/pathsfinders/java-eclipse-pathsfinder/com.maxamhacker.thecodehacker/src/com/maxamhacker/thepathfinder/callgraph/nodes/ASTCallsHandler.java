package com.maxamhacker.thepathfinder.callgraph.nodes;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.internal.compiler.ASTVisitor;
import org.eclipse.jdt.internal.compiler.ast.AllocationExpression;
import org.eclipse.jdt.internal.compiler.ast.MessageSend;
import org.eclipse.jdt.internal.compiler.lookup.BlockScope;
import org.eclipse.jdt.internal.core.CompilationUnit;
import org.eclipse.jdt.internal.core.JavaModel;

@SuppressWarnings("restriction")
public class ASTCallsHandler extends ASTVisitor {
	
	public static int CallsNumber = 0;
	
	private CGNode node;
	
	public ASTCallsHandler(CGNode node) {
		this.node = node;
	}
	
	private CompilationUnit createCompilationUnitFromFile(String filePath) {
		Path path = new Path(filePath);	
		IResource file = JavaModel.getWorkspaceTarget(path);
		if (file instanceof IFile)
			return (CompilationUnit)JavaCore.create(file);
		return null;
	}
	
	@Override
	public void endVisit(MessageSend messageSend, BlockScope scope) {	
		try {
			String className = String.copyValueOf(messageSend.binding.declaringClass.genericTypeSignature());
			String methodName = messageSend.binding.toString();
			String methodId = className + methodName;
			String fileName = String.copyValueOf(messageSend.binding.declaringClass.getFileName());
			CompilationUnit unit = createCompilationUnitFromFile(fileName);
			String[] arguments = new String[messageSend.argumentTypes.length];
			for (int idx = 0; idx < messageSend.argumentTypes.length; idx ++) {
				String argReadbleTypeName = new String(messageSend.argumentTypes[idx].readableName());
				String[] pkgs = argReadbleTypeName.split("[.]");
				arguments[idx] = pkgs[pkgs.length - 1];
			}
			CGCall methodCall = new CGCall();
			methodCall.setName(String.copyValueOf(messageSend.binding.selector));
			methodCall.setMethodId(methodId);
			methodCall.setCompilationUnit(unit);
			methodCall.setArguments(arguments);
			this.node.addChild(methodCall);
		} catch (Exception e) {
			String result = e.toString();
			System.out.println(result);
		}
		CallsNumber ++;
	}
	
	@Override
	public void endVisit(AllocationExpression allocationExpression, BlockScope scope) {
		String className = String.copyValueOf(allocationExpression.binding.declaringClass.genericTypeSignature());
		String methodName = allocationExpression.binding.toString();
		String methodId = className + methodName;
		String fileName = String.copyValueOf(allocationExpression.binding.declaringClass.getFileName());
		CompilationUnit unit = createCompilationUnitFromFile(fileName);
		String[] arguments = new String[allocationExpression.argumentTypes.length];
		for (int idx = 0; idx < allocationExpression.argumentTypes.length; idx ++) {
			String argReadbleTypeName = new String(allocationExpression.argumentTypes[idx].readableName());
			String[] pkgs = argReadbleTypeName.split("[.]");
			arguments[idx] = pkgs[pkgs.length - 1];
		}
		CGCall methodCall = new CGCall();
		methodCall.setName(String.copyValueOf(allocationExpression.binding.selector));
		methodCall.setMethodId(methodId);
		methodCall.setCompilationUnit(unit);
		methodCall.setArguments(arguments);
		this.node.addChild(methodCall);
		CallsNumber ++;
	}

}
