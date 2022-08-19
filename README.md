*** ALL CREDIT TO TITUS WORMER (<https://github.com/wooorm>) FOR ORIGINAL CODE ***

## Description
Generalization of woorm's code in micromark-extension-gfm-strikethrough to allow easy addition of simple span/inline "emphasis" style elements Markdown ⇔ HTML by configuring extensions for micromark, mdast and hast.

## Use
Use the function `createEmphasis` with appropriate values to create a set of extensions to be used in the different manipulations. See example below. The symbol(s) must consist of identical characters that will be the start and end of the markdown span (similar to `*emphasis*` and `**strong**`). Note that it is possible to use the same character but different lengths for different markdown spans, i.e. it is possible to use both `~` for subscript and `~~` for strikethrough at the same time.

## Example
<pre><code>
import {createEmphasis} from './src/index';
import {fromMarkdown as parseMdastFromMarkdown} from 'mdast-util-from-markdown';
import {toMarkdown as serializeMdastToMarkdown} from 'mdast-util-to-markdown';
import {toHast as mdastToHast} from 'mdast-util-to-hast';
import {toHtml as hastToHtml} from 'hast-util-to-html';
import {fromHtml as hastFromHtml} from 'hast-util-from-html';
import {toMdast as hastToMdast} from 'hast-util-to-mdast';
import type {MdastNode} from 'hast-util-to-mdast/lib';
import type {HastNode} from 'mdast-util-to-hast/lib';

const superscript = createEmphasis({
    markdownSymbol: '^',
    mdastNode: 'superscript',
    htmlNode: 'sup'
})

const subscript = createEmphasis({
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
</code></pre>

Generates `Some ^superscript^ and ~subscript~ text. ⇒ <p>Some <sup>superscript</sup> and <sub>subscript</sub> text.</p> ⇒ Some ^superscript^ and ~subscript~ text.`.
