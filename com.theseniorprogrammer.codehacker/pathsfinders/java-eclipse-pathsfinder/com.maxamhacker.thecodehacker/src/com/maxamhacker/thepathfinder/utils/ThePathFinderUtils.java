package com.maxamhacker.thepathfinder.utils;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.internal.core.CompilationUnit;
import org.eclipse.jdt.internal.core.JavaModel;

@SuppressWarnings("restriction")
public class ThePathFinderUtils {
	
	public static CompilationUnit createCompilationUnitFromFile(String filePath) {
		Path path = new Path(filePath);	
		IResource file = JavaModel.getWorkspaceTarget(path);
		if (file instanceof IFile)
			return (CompilationUnit)JavaCore.create(file);
		return null;
	}
}
