import Editor from "@monaco-editor/react";
import { useRef } from "react";

export default function App() {

    const editorRef = useRef(null);

    function handleEditorDidMount(monaco) {
        const keywords = [
            "sub", "subrutina",
            "si", "sino", "salir",
            "desde", "hasta", "retorna", "inicio",
            "fin", "var", "numerico", "cadena",
            "vector", "matriz",
        ]

        monaco.languages.register({ id: "sl2" })
        monaco.languages.setMonarchTokensProvider("sl2", {
            keywords,
            tokenizer: {
                root: [
                    [/@?[a-zA-Z][\w$]/, {
                        cases: {
                            '@keywords': "keyword",
                            '@default': "string",
                        }
                    }],
                    [/".*?"/, 'string'],
                    [/\/\//, 'comment'],
                ]
            }
        });

        monaco.editor.defineTheme("sl2-theme", {
            base: 'vs',
            rules: [
                { token: 'keyword', foreground: '#FF6600', fontStyle: 'bold' },
                { token: 'text', foreground: '#222222' },
                { token: 'string', foreground: '#fff112' },
                { token: 'comment', foreground: '#555555' },
            ]
        })
    }

    return <Editor
        height="90vh" defaultLanguage="sl2"
        // theme="sl2-theme"
        defaultValue="
var

inicio

fin"
        beforeMount={handleEditorDidMount}
    />;
}

