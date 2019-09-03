package com.maxamhacker.thepathfinder.callgraph;

import com.maxamhacker.thepathfinder.callgraph.nodes.ASTCallsHandler;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGMethod;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGNode;
import com.maxamhacker.thepathfinder.drawing.LayoutDebugPrinter;
import com.maxamhacker.thepathfinder.drawing.LayoutGraphBuilder;
import com.maxamhacker.thepathfinder.drawing.LayoutGraphLevelsBuilder;
import com.maxamhacker.thepathfinder.drawing.LayoutNode;

public class PFCallGraph {
	
	public LayoutNode layoutRoot;
	private CGMethod root;
	private String name;
	
	public PFCallGraph() {
	}
	
	public PFCallGraph(String name) {
		this.name = name;
	}
	
	public void setRoot(CGMethod node) {
		if (node == null)
			return;
		this.root = node;
	}
	
	public CGMethod getRoot() {
		return this.root;
	}
	
	public void setGraphName(String name) {
		if (name == null || name.isEmpty())
			return;
		this.name = name;
	}
	
	public String getGraphName() {
		return this.name;
	}
	
	public void build() {
		ASTCallsHandler.CallsNumber = 0;
 		CGCallsBulder callsBuilder = new CGCallsBulder();
		CGMethodsBuilder methodsBuilder = new CGMethodsBuilder();
		
		int callsNumber = ASTCallsHandler.CallsNumber;
		traverseGraph(callsBuilder, methodsBuilder);
		saveToJsonWithNodesAndLinks(debugPathName(ASTCallsHandler.CallsNumber));
		while (callsNumber != ASTCallsHandler.CallsNumber) {
			callsNumber = ASTCallsHandler.CallsNumber;
			try {
				traverseGraph(callsBuilder, methodsBuilder);
			} catch (Exception e) {
				saveToJsonWithNodesAndLinks(debugPathName());
			}
			saveToJsonWithNodesAndLinks(debugPathName(ASTCallsHandler.CallsNumber));
		}
		buildLayoutGraph(new LayoutGraphBuilder());
	}
	
	private void traverseGraph(CGCallsBulder callsBuilder, CGMethodsBuilder methodsBuilder) {
		CGNode.pathNodes.clear();
		getRoot().accept(callsBuilder);
		CGNode.pathNodes.clear();
		getRoot().accept(methodsBuilder);
	}
	
	private void buildLayoutGraph(CGNodeVisitor layoutGraphBuilder) {
		getRoot().accept(layoutGraphBuilder);
		layoutRoot = ((LayoutGraphBuilder)layoutGraphBuilder).getRoot();
		layoutRoot.accept(new LayoutGraphLevelsBuilder());
		layoutRoot.levelsBuilder.processWidthAndHeight();
		layoutRoot.levelsBuilder.processXY();
		layoutRoot.levelsBuilder.centerForRoot();
		layoutRoot.accept(new LayoutDebugPrinter());
	}
	
	public void saveToJsonWithNodesAndLinks(String path) {
		CGNodesAndLinksBuilder nodesAndLinksBuilder = new CGNodesAndLinksBuilder();
		getRoot().accept(nodesAndLinksBuilder);
		nodesAndLinksBuilder.saveToFile(path);
	}
	
	public void saveToFile(String path) {
		return;
	}
	
	private String debugPathName(int step) {
		return "/Users/maxamhacker/Documents/GitHub/TheGraph-step" + String.valueOf(step) + ".txt";
	}
	
	private String debugPathName() {
		return "/Users/maxamhacker/Documents/GitHub/TheGraph-exception.txt";
	}
}
