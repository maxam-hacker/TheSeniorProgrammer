package com.maxamhacker.thepathfinder.drawing;

import java.util.Arrays;
import java.util.LinkedList;

import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Canvas;
import org.eclipse.swt.widgets.Label;

import com.maxamhacker.thepathfinder.callgraph.nodes.CGCall;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGMethod;
import com.maxamhacker.thepathfinder.callgraph.nodes.CGNode;

public class LayoutNode {
	
	public LayoutGraphLevelsBuilder levelsBuilder = null;
	
	private LayoutNode parent;
	private LayoutNode[] children;
	private CGMethod method;
	private LinkedList<CGCall> calls;
	private int number;
	private int capacity;
	
	private int x;
	private int y;
	private int width;
	private int height;
	private int level;
	
	private Label headerLabel;
	private Label futerLabel;
	
	public LayoutNode() {
		this.number = 0;
		this.capacity = 10;
		this.children = new LayoutNode[this.capacity];
		this.calls = new LinkedList<CGCall>();
	}
	
	public void setX(int x) {
		this.x = x;
	}
	
	public int getX() {
		return this.x;
	}
	
	public void shiftX(int delta) {
		this.x += delta;
	}
	
	public void setY(int y) {
		this.y = y;
	}
	
	public int getY() {
		return this.y;
	}
	
	public void shiftY(int delta) {
		this.y += delta;
	}
	
	public void setWidth(int width) {
		this.width = width;
	}
	
	public int getWidth() {
		return this.width;
	}
	
	public void setHeight(int height) {
		this.height = height;
	}
	
	public int getHeight() {
		return this.height;
	}

	public void setLevel(int level) {
		this.level = height;
	}
	
	public int getLevel() {
		return this.level;
	}
	
	public LayoutNode[] getChildren() {
		return this.children;
	}
	
	public void setParent(LayoutNode node) {
		this.parent = node;
	}
	
	public LayoutNode getParent() {
		return this.parent;
	}
	
	public int getNumber() {
		return this.number;
	}
	
	public void addChild(LayoutNode node) {
		
		if (node == null)
			return;
		
		this.number += 1;
		if (this.number > this.capacity) {
			this.capacity += 3;
			this.children = Arrays.copyOf(this.children, this.capacity);
		}
		this.children[this.number - 1] = node;
		node.setParent(this);
	}
	
	public void accept(LayoutVisitor visitor) {
		visitor.visit(this);
		acceptChildren(visitor);
	}
	
	public void acceptChildren(LayoutVisitor visitor) {
		for (int idx = 0; idx < this.number; idx ++) {
			this.children[idx].level = level + 1;
			this.children[idx].accept(visitor);
		}
	}
	
	public void setMethod(CGMethod method) {
		this.method = method;
	}
	
	public CGMethod getMethod() {
		return this.method;
	}
	
	public void setCalls(CGNode[] calls) {
		for (int idx = 0; idx < calls.length; idx ++)
			if (calls[idx] != null)
				this.calls.add((CGCall)calls[idx]);
	}
	
	public LinkedList<CGCall> getCalls() {
		return this.calls;
	}
	
	public Label getHeaderLabel(Canvas canvas) {
		if (headerLabel == null) {
			headerLabel = new Label(canvas, SWT.BORDER);
		}
		return headerLabel;
	}
	
}
