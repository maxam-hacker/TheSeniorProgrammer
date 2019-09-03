package com.maxamhacker.thepathfinder.callgraph;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;

import com.maxamhacker.thepathfinder.callgraph.nodes.CGCall;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGMethod;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGNode;

public class CGNodesAndLinksBuilder implements CGNodeVisitor {
	
	protected HashMap<Integer, CGNode> nodes = new HashMap<Integer, CGNode>();
	protected HashMap<String, Integer> links = new HashMap<String, Integer>();
	
	@Override
	public void visit(CGMethod node) {
		int id = node.getNodeId();
		this.nodes.put(id, node);
		for (int idx = 0; idx < node.getNumber(); idx ++) {
			CGNode child = node.getChildren()[idx];
			String linkName = String.valueOf(node.getNodeId()) + "~" + String.valueOf(child.getNodeId());
			this.links.put(linkName, 1);
		}
		
	}
	
	@Override
	public void visit(CGCall node) {
		int id = node.getNodeId();
		this.nodes.put(id, node);
		for (int idx = 0; idx < node.getNumber(); idx ++) {
			CGNode child = node.getChildren()[idx];
			String linkName = String.valueOf(node.getNodeId()) + "~" + String.valueOf(child.getNodeId());
			this.links.put(linkName, 1);
		}
	}
	
	public void saveToFile(String path) {
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(path, false));
		    writer.append("{").append("\n");
		    
		    writer.append("\t").append("nodes: [").append("\n");
			Iterator<Entry<Integer, CGNode>> nodesWalker = this.nodes.entrySet().iterator();
			while (nodesWalker.hasNext()) {
				Entry<Integer, CGNode> node = nodesWalker.next();
				String id = String.valueOf(node.getKey());
				String name = node.getValue().getName();
				String type = "method";
				if (node.getValue() instanceof CGCall)
					type = "call";
				String nodeString = String.format("{id: %s, name: %s, type: %s}", 
						String.valueOf(id), name, type);
				writer.append("\t\t").append(nodeString);
				if (nodesWalker.hasNext())
					writer.append(",");
				writer.append("\n");
			}
			writer.append("\t").append("],").append("\n");
			
			writer.append("\t").append("links: [").append("\n");
			Iterator<Entry<String, Integer>> linksWalker = this.links.entrySet().iterator();
			while (linksWalker.hasNext()) {
				Entry<String, Integer> node = linksWalker.next();
				String[] tags = String.valueOf(node.getKey()).split("~");
				String weigth = String.valueOf(node.getValue());
				String linkString = String.format("{source: %s, target: %s, weight: %s}", 
						tags[0], tags[1], weigth);
				writer.append("\t\t").append(linkString);
				if (linksWalker.hasNext())
					writer.append(",");
				writer.append("\n");
			}
			writer.append("\t").append("]").append("\n");
			
			writer.append("}");
			writer.close();
		} catch (Exception e) {
			
		}
	}
}
