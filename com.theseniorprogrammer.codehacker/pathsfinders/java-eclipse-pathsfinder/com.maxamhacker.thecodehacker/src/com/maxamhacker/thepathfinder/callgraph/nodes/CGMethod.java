package com.maxamhacker.thepathfinder.callgraph.nodes;

import com.maxamhacker.thepathfinder.callgraph.CGNodeVisitor;

public class CGMethod extends CGNode {
	
	public void accept(CGNodeVisitor visitor) {
		visitor.visit(this);
		CGNode.pathNodes.put(this.getMethodId(), this);
		this.acceptChildren(visitor);
		CGNode.pathNodes.remove(this.getMethodId());
	}
	
}
