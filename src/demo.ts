import {createInline} from './index';
import {fromMarkdown as parseMdastFromMarkdown} from 'mdast-util-from-markdown';
import {toMarkdown as serializeMdastToMarkdown} from 'mdast-util-to-markdown';
import {toHast as mdastToHast} from 'mdast-util-to-hast';
import {toHtml as hastToHtml} from 'hast-util-to-html';
import {fromHtml as hastFromHtml} from 'hast-util-from-html';
import {toMdast as hastToMdast} from 'hast-util-to-mdast';
import type {MdastNode} from 'hast-util-to-mdast/lib';
import type {HastNode} from 'mdast-util-to-hast/lib';

const superscript = createInline({
    markdownSymbol: '^',
    mdastNode: 'superscript',
    htmlNode: 'sup'
})

const subscript = createInline({
    markdownSymbol: '~',
    mdastNode: 'subscript',
    htmlNode: 'sub'
});

const src = 'Some ^superscript^ and ~subscript~ text.';
let mdast = <MdastNode><any>parseMdastFromMarkdown(src, {
    extensions: [
        superscript.markdownSyntax,
        subscript.markdownSyntax
    ],
    mdastExtensions: [
        superscript.mdastNodeInsertion,
        subscript.mdastNodeInsertion
    ]
});
let hast = <HastNode>mdastToHast(mdast, {
    handlers: {
        ...superscript.mdastHandler,
        ...subscript.mdastHandler
    }
});
const html = hastToHtml(hast);
hast = hastFromHtml(html, {fragment: true});
mdast = <MdastNode>hastToMdast(hast, {
    handlers: {
        ...superscript.hastHandler,
        ...subscript.hastHandler
    }
});
const dest = serializeMdastToMarkdown(mdast, {
    extensions: [
        superscript.mdastSerialization,
        subscript.mdastSerialization
    ]
});
console.log(`${src} ⇒ ${html} ⇒ ${dest}`);
