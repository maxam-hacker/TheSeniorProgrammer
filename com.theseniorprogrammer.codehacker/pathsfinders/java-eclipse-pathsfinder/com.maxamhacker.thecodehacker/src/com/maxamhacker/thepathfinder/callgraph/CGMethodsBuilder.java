package com.maxamhacker.thepathfinder.callgraph;

import com.maxamhacker.thepathfinder.callgraph.nodes.CGCall;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGMethod;

public class CGMethodsBuilder implements CGNodeVisitor {
	
	@Override
	public void visit(CGCall node) {
		if (!node.isVisited()) {
			try {
				node.createMethodFromTheCall();
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

	@Override
	public void visit(CGMethod node) {
		return;
	}

}
