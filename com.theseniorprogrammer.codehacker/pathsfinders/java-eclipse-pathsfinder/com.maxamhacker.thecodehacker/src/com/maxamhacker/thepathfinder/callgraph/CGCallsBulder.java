package com.maxamhacker.thepathfinder.callgraph;

import com.maxamhacker.thepathfinder.callgraph.nodes.CGCall;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGMethod;

public class CGCallsBulder implements CGNodeVisitor {
	
	public void visit(CGMethod node) {
		if (!node.isVisited()) {
			try {
				node.compileAndResolve();
			} catch (Exception e) {
				String result = e.toString();
				System.out.println(result);
			}
			try {
				node.traverseAndFindCalls(node.getName());
			} catch (Exception e) {
				String result = e.toString();
				System.out.println(result);
			}
			try {
				node.setVisited();
			} catch (Exception e) {
				String result = e.toString();
				System.out.println(result);
			}
		}
	}
	
	public void visit(CGCall node) {
		return;
	}
	
}
