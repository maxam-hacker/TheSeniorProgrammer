package com.maxamhacker.codehacker.ideas;


import com.intellij.codeInsight.CodeInsightActionHandler;
import com.intellij.codeInsight.TargetElementUtil;
import com.intellij.codeInsight.navigation.GotoImplementationHandler;
import com.intellij.codeInsight.navigation.GotoTargetHandler;
import com.intellij.codeInsight.navigation.ImplementationSearcher;
import com.intellij.codeInsight.navigation.actions.GotoImplementationAction;
import com.intellij.featureStatistics.FeatureUsageTracker;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.actionSystem.CommonDataKeys;
import com.intellij.openapi.command.WriteCommandAction;
import com.intellij.openapi.diagnostic.Logger;
import com.intellij.openapi.editor.Caret;
import com.intellij.openapi.editor.Document;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.project.DumbService;
import com.intellij.openapi.project.IndexNotReadyException;
import com.intellij.openapi.project.Project;
import com.intellij.pom.Navigatable;
import com.intellij.psi.PsiFile;
import com.intellij.psi.PsiElement;
import org.jetbrains.annotations.NotNull;

import java.lang.reflect.Method;


public class ExpandCallAction extends GotoImplementationAction {

    private static final Logger LOG = Logger.getInstance(ExpandCallAction.class);

    private AnActionEvent myAction;
    private Project myProject;
    private Editor myEditor;
    private PsiElement myCall;

    @Override
    public void actionPerformed(@NotNull AnActionEvent e) {
        myAction = e;
        super.actionPerformed(e);
    }

    public void actionPerformedImpl(@NotNull final Project project, final Editor editor) {
        myProject = project;
        myEditor = editor;
        int offset = myEditor.getCaretModel().getOffset();
        myCall = TargetElementUtil.getInstance().findTargetElement(myEditor, ImplementationSearcher.getFlags(), offset);
        super.actionPerformedImpl(project, editor);
    }

    @Override
    protected CodeInsightActionHandler getHandler(){
        return new MyCodeInsightActionHandler();
    }


    public class MyCodeInsightActionHandler extends GotoImplementationHandler {

        @Override
        public void invoke(@NotNull Project project, @NotNull Editor editor, @NotNull PsiFile file) {
            FeatureUsageTracker.getInstance().triggerFeatureUsed(getFeatureUsedKey());

            try {
                GotoData gotoData = getSourceAndTargetElements(editor, file);
                if (gotoData != null) {
                    show(project, editor, file, gotoData);
                }
                else {
                    chooseFromAmbiguousSources(editor, file, data -> show(project, editor, file, data));
                }
            }
            catch (IndexNotReadyException e) {
                DumbService.getInstance(project).showDumbModeNotification("Navigation is not available here during index update");
            }
        }

        private void show(@NotNull Project project,
                          @NotNull Editor editor,
                          @NotNull PsiFile file,
                          @NotNull GotoData gotoData) {
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

        @Override
        protected void navigateToElement(@NotNull Navigatable descriptor) {
            if (descriptor instanceof PsiElement) {
                String methodText = ((PsiElement) descriptor).getOriginalElement().getText();
                Document document = ExpandCallAction.this.myEditor.getDocument();
                Caret primaryCaret = ExpandCallAction.this.myEditor.getCaretModel().getPrimaryCaret();
                int start = myCall.getOriginalElement().getTextOffset();
                int length = myCall.getOriginalElement().getTextLength();
                int p0 = myCall.getTextRange().getStartOffset();
                int p1 = myCall.getTextRange().getEndOffset();
                int p2 = myCall.getTextRange().getLength();
                WriteCommandAction.runWriteCommandAction(ExpandCallAction.this.myProject, () -> {
                    document.insertString(p1, "\n" + methodText + "\n");
                });
            }
        }
    }
}
