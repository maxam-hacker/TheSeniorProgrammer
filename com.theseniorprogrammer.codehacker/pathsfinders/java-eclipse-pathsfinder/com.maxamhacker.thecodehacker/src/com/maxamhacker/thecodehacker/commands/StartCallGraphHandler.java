package com.maxamhacker.thecodehacker.commands;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.commands.AbstractHandler;
import org.eclipse.core.commands.ExecutionEvent;
import org.eclipse.core.commands.ExecutionException;
import org.eclipse.ui.IEditorPart;
import org.eclipse.ui.IViewPart;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.handlers.HandlerUtil;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.text.ITextSelection;
import org.eclipse.jdt.core.IField;
import org.eclipse.jdt.core.IInitializer;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IMember;
import org.eclipse.jdt.core.IMethod;
import org.eclipse.jdt.core.ITypeRoot;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.internal.corext.callhierarchy.CallHierarchy;
import org.eclipse.jdt.internal.ui.JavaPlugin;
import org.eclipse.jdt.internal.ui.actions.SelectionConverter;
import org.eclipse.jdt.internal.ui.javaeditor.CompilationUnitEditor;

import com.maxamhacker.thecodehacker.views.TheMaxamHackerCallGraphView;

@SuppressWarnings("restriction")
public class StartCallGraphHandler extends AbstractHandler  {
	
	@Override
	public Object execute(ExecutionEvent event) throws ExecutionException {		 
		IViewPart callGraphEditor = null;
		IWorkbenchPage page = HandlerUtil.getActiveWorkbenchWindow(event).getActivePage();
		ISelection selection = page.getSelection();
		IEditorPart codeEditor = page.getActiveEditor();
		IMember[] members = null;
		 
		if (codeEditor == null || selection == null) return null;
		if (!(codeEditor instanceof CompilationUnitEditor)) return null;
		if (!(selection instanceof ITextSelection)) return null;
		 
		try {
			ITypeRoot input= SelectionConverter.getInput((CompilationUnitEditor)codeEditor);
			IJavaElement[] elements= SelectionConverter.codeResolveOrInputForked((CompilationUnitEditor)codeEditor);
			if (elements == null) return null;
			List<IJavaElement> candidates= new ArrayList<>(elements.length);
			for (int i= 0; i < elements.length; i++) {
				IJavaElement element= elements[i];
				if (CallHierarchy.isPossibleInputElement(element))
					candidates.add(element);
			}
				
			if (candidates.isEmpty()) {
				IJavaElement enclosingMethod= getEnclosingMethod(input, (ITextSelection)selection);
				if (enclosingMethod != null)
					candidates.add(enclosingMethod);
			}
			members = candidates.toArray(new IMember[candidates.size()]);
			callGraphEditor = page.showView("com.maxamhacker.thecodehacker.views.TheMaxamHackerCallGraphView");
			((TheMaxamHackerCallGraphView)callGraphEditor).startCallGraph(codeEditor, members);
		} catch (Exception e) {
			 
		}
	    return null;
	}
	 
	private IJavaElement getEnclosingMethod(ITypeRoot input, ITextSelection selection) {
		try {
			IJavaElement element = input.getElementAt(selection.getOffset());
			if (element instanceof IMethod || element instanceof IInitializer || element instanceof IField)
				return element;
		} catch (JavaModelException e) {
			JavaPlugin.log(e);
		}
		return null;
	}
	 
}


