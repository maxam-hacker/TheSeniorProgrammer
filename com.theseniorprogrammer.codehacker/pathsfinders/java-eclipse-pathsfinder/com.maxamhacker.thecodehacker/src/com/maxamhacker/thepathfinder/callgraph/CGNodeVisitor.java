package com.maxamhacker.thepathfinder.callgraph;

import com.maxamhacker.thepathfinder.callgraph.nodes.*;

public interface CGNodeVisitor {
	
	public void visit(CGMethod node);
	
	public void visit(CGCall node);
	
}
