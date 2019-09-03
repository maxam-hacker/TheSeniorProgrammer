package com.maxamhacker.thepathfinder.callgraph.nodes;

import org.eclipse.jdt.internal.compiler.ASTVisitor;
import org.eclipse.jdt.internal.compiler.ast.MethodDeclaration;
import org.eclipse.jdt.internal.compiler.lookup.ClassScope;

@SuppressWarnings("restriction")
public class ASTMethodsFinder extends ASTVisitor {
	
	private CGNode node;
	private String tgtMethodName;
	
	public ASTMethodsFinder(CGNode node, String methodName) {
		this.node = node;
		this.tgtMethodName = methodName;
	}
	
	@Override
	public boolean visit(MethodDeclaration methodDeclaration, ClassScope scope) {	
		String currentMethodName = String.copyValueOf(methodDeclaration.binding.selector);
		if (currentMethodName.equals(this.tgtMethodName)) {
			if ((methodDeclaration.arguments == null && this.node.getArguments().length == 0) || 
				(methodDeclaration.arguments != null && methodDeclaration.arguments.length == this.node.getArguments().length)) {
				if (methodDeclaration.arguments != null) {
					for (int idx = 0; idx < methodDeclaration.arguments.length; idx ++) {
						String tgtArgName = this.node.getArguments()[idx];
						String curArgName = methodDeclaration.arguments[idx].type.toString();
						if (!tgtArgName.equals(curArgName))
							return true;
					}
				}
				methodDeclaration.traverse(new ASTCallsHandler(this.node), scope);
			}
		}
		return true;
	}

}
