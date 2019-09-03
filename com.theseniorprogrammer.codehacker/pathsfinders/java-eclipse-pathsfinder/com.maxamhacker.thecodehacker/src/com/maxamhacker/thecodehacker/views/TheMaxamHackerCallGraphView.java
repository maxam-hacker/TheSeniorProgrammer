package com.maxamhacker.thecodehacker.views;


import org.eclipse.swt.widgets.Canvas;
import org.eclipse.swt.widgets.Text;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.ui.part.*;

import com.maxamhacker.thepathfinder.ThePathFinder;
import com.maxamhacker.thepathfinder.drawing.LayoutNode;
import com.maxamhacker.thepathfinder.drawing.LayoutVisitor;

import org.eclipse.swt.graphics.GC;
import org.eclipse.swt.graphics.Point;

import java.util.HashMap;

import org.eclipse.jdt.core.IMember;
import org.eclipse.jdt.internal.core.CompilationUnit;
import org.eclipse.ui.IEditorPart;
import org.eclipse.swt.widgets.Menu;
import org.eclipse.swt.widgets.MenuItem;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.PaintEvent;
import org.eclipse.swt.events.PaintListener;


/**
 * This sample class demonstrates how to plug-in a new
 * workbench view. The view shows data obtained from the
 * model. The sample creates a dummy model on the fly,
 * but a real implementation would connect to the model
 * available either in this or another plug-in (e.g. the workspace).
 * The view is connected to the model using a content provider.
 * <p>
 * The view uses a label provider to define how model
 * objects should be presented in the view. Each
 * view can present the same model objects using
 * different labels and icons, if needed. Alternatively,
 * a single label provider can be shared between views
 * in order to ensure that objects of the same type are
 * presented in the same way everywhere.
 * <p>
 */

@SuppressWarnings("restriction")
public class TheMaxamHackerCallGraphView extends ViewPart {

	/**
	 * The ID of the view as specified by the extension.
	 */
	public static final String ID = "com.maxamhacker.thecodehacker.views.TheMaxamHackerCallGraphView";

	private IEditorPart codeEditor;
	private IMember[] members;
	
	private class CallGraphPainter implements LayoutVisitor {
		
		private GC gc;

		public CallGraphPainter(GC gc) {
			this.gc = gc;
		}
		
		@Override
		public void visit(LayoutNode node) {
			int x0 = node.getX();
			int x1 = node.getX() + node.getWidth();
			int y0 = node.getY();
			int y1 = node.getY() + node.getHeight();
			gc.drawLine(x0, y0, x1, y0);
			gc.drawLine(x1, y0, x1, y1);
			gc.drawLine(x1, y1, x0, y1);
			gc.drawLine(x0, y1, x0, y0);
			node.getHeaderLabel(canvas).setBounds(x0, y0, x1, y1);
			node.getHeaderLabel(canvas).setText(node.getMethod().getName());
		}
		
	}
	
	private class Shifter implements LayoutVisitor {
		
		private int deltaX;
		private int deltaY;
		
		public void setDeltaX(int deltaX) {
			this.deltaX = deltaX;
		}
		
		public void setDeltaY(int deltaY) {
			this.deltaY = deltaY;
		}
		
		@Override
		public void visit(LayoutNode node) {
			node.shiftX(deltaX);
			node.shiftY(deltaY);
		}
		
	}
	
	private Canvas canvas;
	private HashMap<GC, CallGraphPainter> painters = new HashMap<GC, CallGraphPainter>();
	private Shifter shifter = new Shifter();
	private int origin_x, origin_y;
	private boolean movementMode = false;
	
	public void startCallGraph(IEditorPart codeEditor, IMember[] members) {
		this.codeEditor = codeEditor;
		this.members = members;
		ThePathFinder.buildCallGraphs((CompilationUnit)members[0].getCompilationUnit(), members);
	}

	@Override
	public void createPartControl(Composite parent) {
		canvas = new Canvas(parent, SWT.NONE);
		Menu menu = new Menu(canvas);
		new MenuItem(menu, SWT.NONE).setText("Build calls");
		new MenuItem(menu, SWT.NONE).setText("Build methods");
		new MenuItem(menu, SWT.NONE).setText("Open");
		new MenuItem(menu, SWT.NONE).setText("Close");
	    canvas.setMenu(menu);
		canvas.addPaintListener(new PaintListener() {
			@Override
		    public void paintControl(final PaintEvent event) {
				GC gc = event.gc;
				CallGraphPainter painter = null;
				if ((painter = painters.get(gc)) == null)
					painter = new CallGraphPainter(gc);
				if (ThePathFinder.graphs.getFirst() != null)
					ThePathFinder.graphs.getFirst().layoutRoot.accept(painter);
		    }
		});
		canvas.addListener(SWT.MenuDetect, new Listener() {
			@Override
		    public void handleEvent(Event event) {
		    }
		});
		canvas.addListener(SWT.MouseDown, new Listener() {
			@Override
		    public void handleEvent(Event event) {
				Point location = canvas.toControl(event.x, event.y);
		        origin_x = location.x;
		        origin_y = location.y;
		        movementMode = true;
		    }
		});
		canvas.addListener(SWT.MouseUp, new Listener() {
			@Override
		    public void handleEvent(Event event) {
		        movementMode = false;
		    }
		}); 
		canvas.addListener(SWT.MouseMove, new Listener() {
			@Override
		    public void handleEvent(Event event) {
				Point location = canvas.toControl(event.x, event.y);
				if (movementMode) {
					int deltaX = location.x - origin_x;
					int deltaY = location.y - origin_y;
					shifter.setDeltaX(deltaX);
					shifter.setDeltaY(deltaY);
					ThePathFinder.graphs.getFirst().layoutRoot.accept(shifter);
			        canvas.redraw();
			        origin_x = location.x;
			        origin_y = location.y;
				}
		    }
		});
	}

	@Override
	public void setFocus() {
	}
}
