package com.maxamhacker.thepathfinder.drawing;

import java.util.HashMap;

import com.maxamhacker.thepathfinder.callgraph.CGNodeVisitor;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGCall;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGMethod;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGNode;

public class LayoutGraphBuilder implements CGNodeVisitor {
	
	private LayoutNode root = null;
	private HashMap<CGNode, LayoutNode> methodsMap = new HashMap<CGNode, LayoutNode>();
	
	public LayoutNode getRoot() {
		return this.root;
	}
	
	@Override
	public void visit(CGMethod node) {
		LayoutNode layoutNode = new LayoutNode();
		layoutNode.setMethod(node);
		if (this.root == null)
			this.root = layoutNode;
		layoutNode.setCalls(node.getChildren());
		if (node.getParent() != null && node.getParent().getParent() != null) {
			CGNode parent = node.getParent().getParent();
			if (parent instanceof CGMethod && methodsMap.get(parent) != null) {
				layoutNode.setParent(methodsMap.get(parent));
				methodsMap.get(parent).addChild(layoutNode);
			}
		}
		methodsMap.put(node, layoutNode);
	}

	@Override
	public void visit(CGCall node) {

	}

}
