package com.maxamhacker.thepathfinder;

import java.util.Map;

import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.internal.core.CompilationUnitElementInfo;
import org.eclipse.jdt.internal.core.CompilationUnitStructureRequestor;

@SuppressWarnings("restriction")
public class PFCompilationUnitStructureRequestor extends CompilationUnitStructureRequestor {

	public PFCompilationUnitStructureRequestor(ICompilationUnit unit, CompilationUnitElementInfo unitInfo,
			Map newElements) {
		super(unit, unitInfo, newElements);
	}

}
