import ReactMarkdown from 'react-markdown';
// @ts-ignore
import MathJax from 'react-mathjax';
// @ts-ignore

import RemarkMathPlugin from 'remark-math';
import rehypeMathJax from 'rehype-mathjax';
// @ts-ignore
import rehypeHighlight from "rehype-highlight";

import remarkGfm from 'remark-gfm'


import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
// @ts-ignore
import rangeParser from 'parse-numeric-range';
import {atomDark as theme} from "react-syntax-highlighter/dist/esm/styles/prism";
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import style from './markdown.module.scss'

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('python', python);


function MarkdownRender(props: { children: string }) {
    const syntaxTheme = theme;

    const MarkdownComponents: object = {
        // @ts-ignore

        code({node, inline, className, children, ...props}) {
            console.log({node, inline, className, children})
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
                <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={
                        syntaxTheme
                    }
                    language={match[1]}
                    {...props}
                />
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
    }

    return (
        <div className={style.reactMarkdown}>
            <ReactMarkdown
                remarkPlugins={[RemarkMathPlugin
                    , remarkGfm]}
                rehypePlugins={[
                    rehypeMathJax,
                ]}

                components={
                    {
                        ...MarkdownComponents,
                        // @ts-ignore


                    }
                }
            >
                {props.children}
            </ReactMarkdown>
        </div>

    );
}

export default MarkdownRender