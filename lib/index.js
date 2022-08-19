/**
 * @typedef {import('micromark-util-types').Extension} MicromarkExtension
 * @typedef {import('micromark-util-types').HtmlExtension} MicromarkHtmlExtension
 * @typedef {import('mdast-util-from-markdown').Extension} MdastExtension
 * @typedef {import('mdast-util-to-markdown').Options} MdastSerializationOptions
 * @typedef {import('mdast-util-to-hast').H} MdastHandle
 * @typedef {import('mdast-util-to-hast').Handlers} MdastHandlers
 * @typedef {import('hast-util-to-mdast').Handle} HastHandle
 * @typedef {import('hast-util-to-mdast').H} HastH
 * @typedef {{[x: string]: HastHandle}} HastHandlers
 * @typedef {import('mdast-util-to-hast/lib').Element} MdastElement
 * @typedef {import('mdast-util-to-hast/lib').MdastNode} MdastNode
 * @typedef {import('mdast-util-inline-factory').Inline} Inline
 */
/**
 * @typedef Configuration Configuration for inline type to generate.
 * @property {string} markdownSymbol Symbol(s) in markdown, e.g. '^' or '~~'
 * @property {string} mdastNode Mdast node name
 * @property {string} htmlNode HTML node name, eg 'sup' for a '<sup>'
 */
/**
 * @typedef Extensions
 *   Object with generated extensions for micromark and mdast/hast utils
 * @property {MicromarkExtension} markdownSyntax
 *   For micromark `extensions` / mdast-util-from-markdown.fromMarkdown `extensions`
 * @property {MicromarkHtmlExtension} micromarkHtml
 *   For micromark `htmlExtensions`
 * @property {MdastExtension} mdastNodeInsertion
 *   For mdast-util-from-markdown.fromMarkdown `mdastExtensions`
 * @property {MdastSerializationOptions} mdastSerialization
 *   For mdast-util-to-markdown.toMarkdown `extensions`
 * @property {MdastHandlers} mdastHandler
 *   Spread in mdast-util-to-hast.toHast `handlers`
 * @property {HastHandlers} hastHandler
 *   Spread in hast-util-to-mdast.toMdast `handlers`
 * @property {string} htmlNode
 *   HTML node (tag) name, e.g. 'sup' for `<sup></sup>`
 */
/**
 * @typedef {import('micromark-util-types').Code} Code
 * @typedef _Configuration
 *   Configuration for inline type to generate.
 * @property {string} markdownSymbol
 *   Symbol(s) in markdown (identical and symetrical), e.g. '^' or '~~'
 * @property {Code} code
 *   Character code for one or the symbols
 * @property {string} mdastNode
 *   Mdast node name
 * @property {string} htmlNode
 *   HTML node (tag) name, eg 'sup' for a '<sup>' tag
 * @property {string} sequence
 *   Internal unique denominator
 * @property {string} tempSequence
 *   Internal unique denominator
 * @property {string} typeText
 *   Internal unique denominator
 * @property {number} symbolLen
 *   Length of symbol(s), e.g. 2 for '~~'
 */
import { inlineFactoryFromMarkdown, inlineFactoryToMarkdown } from 'mdast-util-inline-factory';
import { inlineFactory, inlineFactoryHtml } from 'micromark-extension-inline-factory/dev';
import { all as mdastAll } from 'mdast-util-to-hast';
import { all as hastAll } from 'hast-util-to-mdast';
/**
 * Create object with all extensions from configuration.
 * FIXME: Split into separate creators to reduce overhead?
 * @param {Configuration} cfg
 * @returns {Extensions}
 */
function createInline(cfg) {
    // @ts-ignore - FIXME: how to cast Configuration to _Configuration
    const /** @type {_Configuration} */ _cfg = cfg;
    _cfg.code = cfg.markdownSymbol.charCodeAt(0);
    _cfg.sequence = `${cfg.mdastNode}Sequence`;
    _cfg.tempSequence = `${cfg.mdastNode}TempSequence`;
    _cfg.typeText = `${cfg.mdastNode}Text`;
    _cfg.symbolLen = cfg.markdownSymbol.length;
    /** @type {Extensions} */
    const out = {
        markdownSyntax: inlineFactory(_cfg),
        micromarkHtml: inlineFactoryHtml(_cfg),
        mdastNodeInsertion: inlineFactoryFromMarkdown(_cfg),
        mdastSerialization: inlineFactoryToMarkdown(_cfg),
        mdastHandler: {},
        hastHandler: {},
        htmlNode: _cfg.htmlNode
    };
    out.mdastHandler[_cfg.mdastNode] = function (h, node) {
        return h(node, _cfg.htmlNode, mdastAll(h, node));
    };
    out.hastHandler[_cfg.htmlNode] = function (h, node) {
        const mdastNode = h(node, _cfg.mdastNode, hastAll(h, node));
        mdastNode.data = { hName: _cfg.htmlNode };
        return mdastNode;
    };
    return out;
}
export { createInline };
