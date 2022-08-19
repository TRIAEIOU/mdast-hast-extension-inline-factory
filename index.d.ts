export type MicromarkExtension = import('micromark-util-types').Extension;
export type MicromarkHtmlExtension = import('micromark-util-types').HtmlExtension;
export type MdastExtension = import('mdast-util-from-markdown').Extension;
export type MdastSerializationOptions = import('mdast-util-to-markdown').Options;
export type MdastHandle = import('mdast-util-to-hast').H;
export type MdastHandlers = import('mdast-util-to-hast').Handlers;
export type HastHandle = import('hast-util-to-mdast').Handle;
export type HastH = import('hast-util-to-mdast').H;
export type HastHandlers = {
    [x: string]: import("hast-util-to-mdast/lib/types").Handle;
};
export type MdastElement = import('mdast-util-to-hast/lib').Element;
export type MdastNode = import('mdast-util-to-hast/lib').MdastNode;
export type Inline = import('mdast-util-inline-factory').Inline;
/**
 * Configuration for inline type to generate.
 */
export type Configuration = {
    /**
     * Symbol(s) in markdown, e.g. '^' or '~~'
     */
    markdownSymbol: string;
    /**
     * Mdast node name
     */
    mdastNode: string;
    /**
     * HTML node name, eg 'sup' for a '<sup>'
     */
    htmlNode: string;
};
/**
 * Object with generated extensions for micromark and mdast/hast utils
 */
export type Extensions = {
    /**
     *   For micromark `extensions` / mdast-util-from-markdown.fromMarkdown `extensions`
     */
    markdownSyntax: MicromarkExtension;
    /**
     *   For micromark `htmlExtensions`
     */
    micromarkHtml: MicromarkHtmlExtension;
    /**
     *   For mdast-util-from-markdown.fromMarkdown `mdastExtensions`
     */
    mdastNodeInsertion: MdastExtension;
    /**
     *   For mdast-util-to-markdown.toMarkdown `extensions`
     */
    mdastSerialization: MdastSerializationOptions;
    /**
     *   Spread in mdast-util-to-hast.toHast `handlers`
     */
    mdastHandler: MdastHandlers;
    /**
     *   Spread in hast-util-to-mdast.toMdast `handlers`
     */
    hastHandler: HastHandlers;
    /**
     *   HTML node (tag) name, e.g. 'sup' for `<sup></sup>`
     */
    htmlNode: string;
};
export type Code = import('micromark-util-types').Code;
/**
 * Configuration for inline type to generate.
 */
export type _Configuration = {
    /**
     *  Symbol(s) in markdown (identical and symetrical), e.g. '^' or '~~'
     */
    markdownSymbol: string;
    /**
     *  Character code for one or the symbols
     */
    code: Code;
    /**
     *  Mdast node name
     */
    mdastNode: string;
    /**
     *  HTML node (tag) name, eg 'sup' for a '<sup>' tag
     */
    htmlNode: string;
    /**
     *  Internal unique denominator
     */
    sequence: string;
    /**
     *  Internal unique denominator
     */
    tempSequence: string;
    /**
     *  Internal unique denominator
     */
    typeText: string;
    /**
     *  Length of symbol(s), e.g. 2 for '~~'
     */
    symbolLen: number;
};
/**
 * Create object with all extensions from configuration.
 * FIXME: Split into separate creators to reduce overhead?
 * @param {Configuration} cfg
 * @returns {Extensions}
 */
export function createInline(cfg: Configuration): Extensions;
