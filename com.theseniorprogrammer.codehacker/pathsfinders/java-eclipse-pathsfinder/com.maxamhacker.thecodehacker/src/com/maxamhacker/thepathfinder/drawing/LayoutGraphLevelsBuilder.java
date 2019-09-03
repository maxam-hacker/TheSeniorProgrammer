package com.maxamhacker.thepathfinder.drawing;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;

public class LayoutGraphLevelsBuilder implements LayoutVisitor {
	
	public HashMap<Integer, LinkedList<LayoutNode>> levels = new HashMap<Integer, LinkedList<LayoutNode>>();
	public int maxLevel = 0;
	
	private class WHProcessor implements LayoutVisitor {

		@Override
		public void visit(LayoutNode node) {
			int height = node.getCalls().size() * LayoutDistances.CallHeight;
			height += (node.getCalls().size() - 1) * LayoutDistances.HeightBetweenCalls;
			height += LayoutDistances.MethodHeaderHeight + LayoutDistances.MethodFooterHeight;
			int width = node.getMethod().getName().length() * 10;
			if (width < LayoutDistances.MethodWidthLowLimit)
				width = LayoutDistances.MethodWidthLowLimit;
			node.setHeight(height);
			node.setWidth(width);
		}

	}
	
	private class XYShifter implements LayoutVisitor {
		
		private int deltaX;
		private int deltaY;
		
		public XYShifter(int deltaX, int deltaY) {
			this.deltaX = deltaX;
			this.deltaY = deltaY;
		}

		@Override
		public void visit(LayoutNode node) {
			node.shiftX(deltaX);
			node.shiftY(deltaY);
		}
		
	}
	
	private LinkedList<LayoutNode> visitedNodes = new LinkedList<LayoutNode>();
	
	@Override
	public void visit(LayoutNode node) {
		if (levels.get(node.getLevel()) == null)
			levels.put(node.getLevel(), new LinkedList<LayoutNode>());
		levels.get(node.getLevel()).add(node);
		if (maxLevel < node.getLevel())
			maxLevel = node.getLevel();
		node.levelsBuilder = this;
	}
	
	public void processWidthAndHeight() {
		levels.get(0).get(0).accept(new WHProcessor());
	}
	
	public void processXY() {
		processLayerForY(maxLevel);
		for (int idx = maxLevel - 1; idx >= 0; idx --)
			processLayerForY(idx);
		for (int idx = maxLevel; idx >= 0; idx --) {
			processLayerForWidth(idx);
			processLayerForX(idx);
		}
	}
	
	private void processLayerForY(int layerNumber) {
		LinkedList<LayoutNode> levelNodes = levels.get(layerNumber);
		for (int idx = 0; idx < levelNodes.size(); idx ++) {
			LayoutNode node = levelNodes.get(idx);
			if (node.getChildren() != null && node.getNumber() > 0) {
				int topY = node.getChildren()[0].getY();
				int bottomY = node.getChildren()[node.getNumber() - 1].getY() + node.getChildren()[node.getNumber() - 1].getHeight();
				node.setY(topY + (bottomY - topY) / 2 - node.getHeight() / 2);
			}
		}
		visitedNodes.clear();
		for (int idx = 0; idx < levelNodes.size() - 1; idx ++) {
			LayoutNode currentNode = levelNodes.get(idx);
			LayoutNode nextNode = levelNodes.get(idx + 1);
			int currentY = nextNode.getY() - currentNode.getHeight() - LayoutDistances.HeightBetweenMethods;
			visitedNodes.add(currentNode);
			if (currentNode.getY() > currentY) {
				Iterator<LayoutNode> visitedNodesWalker = visitedNodes.iterator();
				while (visitedNodesWalker.hasNext())
					visitedNodesWalker.next().accept(new XYShifter(0, currentY - currentNode.getY()));
			}
		}
	}
	
	private void processLayerForWidth(int layerNumber) {
		return;
	}
	
	private void processLayerForX(int layerNumber) {
		LinkedList<LayoutNode> nextLevel = levels.get(layerNumber + 1);
		if (nextLevel == null) return;
		int minX = 0;
		Iterator<LayoutNode> levelWalker = nextLevel.iterator();
		while (levelWalker.hasNext()) {
			if (levelWalker.next().getX() < minX)
				minX = levelWalker.next().getX();
		}
		LinkedList<LayoutNode> currentLevel = levels.get(layerNumber);
		levelWalker = currentLevel.iterator();
		while (levelWalker.hasNext()) {
			LayoutNode node = levelWalker.next();
			int currentX = minX - LayoutDistances.WidthBetweenLevels - node.getWidth();
			if (node.getX() > currentX)
				node.shiftX(currentX - node.getX());
		}
	}
	
	public void centerForRoot() {
		LayoutNode root = levels.get(0).get(0);
		int deltaX = 0 - root.getX();
		int deltaY = 300 - root.getY();
		levels.get(0).get(0).accept(new XYShifter(deltaX, deltaY));
	}

}
