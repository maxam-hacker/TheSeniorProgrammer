package com.maxamhacker.thepathfinder.drawing;

public class LayoutDebugPrinter implements LayoutVisitor {

	@Override
	public void visit(LayoutNode node) {
		StringBuilder messageBuilder = new StringBuilder();
		for (int idx = 0; idx < node.getLevel(); idx ++)
			messageBuilder.append("\t");
		messageBuilder.append("[method: ").append(node.getMethod().getName());
		messageBuilder.append("\t x: ").append(node.getX());
		messageBuilder.append("\t y: ").append(node.getY());
		messageBuilder.append("\t width: ").append(node.getWidth());
		messageBuilder.append("\t height: ").append(node.getHeight());
		messageBuilder.append("]");
		System.out.println(messageBuilder.toString());
	}

}
