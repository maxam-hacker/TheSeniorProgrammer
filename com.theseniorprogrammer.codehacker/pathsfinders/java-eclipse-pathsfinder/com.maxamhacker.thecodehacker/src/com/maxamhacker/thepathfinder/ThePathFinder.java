package com.maxamhacker.thepathfinder;

import java.util.LinkedList;

import org.eclipse.jdt.core.IMember;
import com.maxamhacker.thepathfinder.callgraph.PFCallGraph;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGMethod;

import org.eclipse.jdt.internal.core.CompilationUnit;
import org.eclipse.jdt.internal.core.ResolvedSourceMethod;
import org.eclipse.jdt.internal.core.SourceMethod;

@SuppressWarnings("restriction")
public class ThePathFinder {
	
	public static LinkedList<PFCallGraph> graphs = new LinkedList<PFCallGraph>();
	
	public static void buildCallGraphs(CompilationUnit cu, IMember[] members) {
		for (int i = 0; i < members.length; i ++) {
			IMember member = members[i];
			
			String graphName = member.getElementName();
			CGMethod graphRoot = new CGMethod();
			graphRoot.setCompilationUnit(cu);
			graphRoot.setName(graphName);
			String[] memberArgs = null;
			String[] arguments = new String[0];
			try {
				if (member instanceof SourceMethod) {
					memberArgs = ((SourceMethod)member).getParameterTypes();
				} else if (member instanceof ResolvedSourceMethod) {
					memberArgs = ((ResolvedSourceMethod)member).getParameterTypes();
				}
				if (memberArgs != null) {
					arguments = new String[memberArgs.length];
					for (int idx = 0; idx < arguments.length; idx ++) {
						if (memberArgs[idx].startsWith("[")) {
							arguments[idx] = memberArgs[idx].substring(2, memberArgs[idx].length() - 1);
							arguments[idx] = arguments[idx] + "[]";
						} else {
							arguments[idx] = memberArgs[idx].substring(1, memberArgs[idx].length() - 1);
						}
					}
				}
			} catch (Exception e) {
				
			} 
			graphRoot.setArguments(arguments);
			
			PFCallGraph graph = new PFCallGraph(graphName);
			graph.setRoot(graphRoot);
			graph.build();
			graph.saveToJsonWithNodesAndLinks("/Users/maxamhacker/Documents/GitHub/TheGraph.txt");
			graphs.add(graph);
		}
	}
	
}
