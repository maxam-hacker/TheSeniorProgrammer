package com.maxamhacker.codehacker.ideas;


import com.intellij.codeInsight.CodeInsightActionHandler;
import com.intellij.codeInsight.navigation.GotoImplementationHandler;
import com.intellij.codeInsight.navigation.GotoTargetHandler;
import com.intellij.codeInsight.navigation.actions.GotoImplementationAction;
import com.intellij.featureStatistics.FeatureUsageTracker;
import com.intellij.openapi.diagnostic.Logger;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.project.DumbService;
import com.intellij.openapi.project.IndexNotReadyException;
import com.intellij.openapi.project.Project;
import com.intellij.psi.PsiFile;
import org.jetbrains.annotations.NotNull;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;


public class ExpandCallAction extends GotoImplementationAction {

    private static final Logger LOG = Logger.getInstance(ExpandCallAction.class);

    @Override
    protected CodeInsightActionHandler getHandler(){
        return new MyCodeInsightActionHandler();
    }


    public static class MyCodeInsightActionHandler extends GotoImplementationHandler {

        @Override
        public void invoke(@NotNull Project project, @NotNull Editor editor, @NotNull PsiFile file) {
            FeatureUsageTracker.getInstance().triggerFeatureUsed(getFeatureUsedKey());

            try {
                GotoData gotoData = getSourceAndTargetElements(editor, file);
                if (gotoData != null) {
                    show(project, editor, file, gotoData, true);
                }
                else {
                    chooseFromAmbiguousSources(editor, file, data -> show(project, editor, file, data, true));
                }
            }
            catch (IndexNotReadyException e) {
                DumbService.getInstance(project).showDumbModeNotification("Navigation is not available here during index update");
            }
        }

        private void show(@NotNull Project project,
                          @NotNull Editor editor,
                          @NotNull PsiFile file,
                          @NotNull GotoData gotoData,
                          @NotNull boolean codeHackerFlag) {
            try {
                Method m = GotoTargetHandler.class.getDeclaredMethod("show",
                        Project.class,
                        Editor.class,
                        PsiFile.class,
                        GotoData.class);
                m.setAccessible(true);
                m.invoke(this, project, editor, file, gotoData);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
