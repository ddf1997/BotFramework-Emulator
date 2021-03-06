//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import { connect } from 'react-redux';
import { TabBarProps, TabBar } from './tabBar';
import { RootState } from '../../../../data/store';
import { splitTab, appendTab, setActiveTab, close } from '../../../../data/action/editorActions';
import { enable as enablePresentationMode } from '../../../../data/action/presentationActions';
import { closeDocument } from '../../../../data/action/chatActions';
import { getTabGroupForDocument } from '../../../../data/editorHelpers';

const mapStateToProps = (state: RootState, ownProps: TabBarProps): TabBarProps => ({
  ...ownProps,
  activeBot: state.bot.activeBot,
  activeDocumentId: state.editor.editors[ownProps.owningEditor].activeDocumentId,
  activeEditor: state.editor.activeEditor,
  chats: state.chat.chats,
  editors: state.editor.editors,
  documents: state.editor.editors[ownProps.owningEditor].documents,
  tabOrder: state.editor.editors[ownProps.owningEditor].tabOrder,
});

const mapDispatchToProps = (dispatch): TabBarProps => ({
  splitTab: (contentType: string, documentId: string, srcEditorKey: string, destEditorKey: string) =>
    dispatch(splitTab(contentType, documentId, srcEditorKey, destEditorKey)),
  appendTab: (srcEditorKey: string, destEditorKey: string, tabId: string) =>
    dispatch(appendTab(srcEditorKey, destEditorKey, tabId)),
  enablePresentationMode: () => dispatch(enablePresentationMode()),
  setActiveTab: (documentId: string) => dispatch(setActiveTab(documentId)),
  closeTab: (documentId: string) => {
    dispatch(close(getTabGroupForDocument(documentId), documentId));
    dispatch(closeDocument(documentId));
  }
});

export const TabBarContainer = connect(mapStateToProps, mapDispatchToProps)(TabBar);