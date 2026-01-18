import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useReducer } from "react";
import type { Action, IProps, IState } from "./types";

function reducer(prevState: IState, action: Action): IState {
  switch (action.type) {
    case "start":
      return { ...prevState, loading: true, error: "" };
    case "success":
      return { content: action.payload, loading: false, error: "" };
    case "error":
      return { content: "", loading: false, error: action.content };
    default:
      return prevState;
  }
}

function Index(props: IProps) {
  const { showLineNo, lang, dynamicRawImport } = props;
  const [state, dispatch] = useReducer(reducer, {
    content: props.content ?? "",
    loading: false,
    error: "",
  });

  useEffect(() => {
    if (!dynamicRawImport) {
      return;
    }
    dispatch({ type: "start" });
    dynamicRawImport()
      .then(({ default: content }) => {
        dispatch({ type: "success", payload: content });
      })
      .catch((error) => {
        dispatch({ type: "error", content: error.message });
      });
  }, [dynamicRawImport]);

  const { content, loading, error } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!content) {
    return <div>Empty</div>;
  }

  return (
    <Highlight theme={themes.vsLight} code={content} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} font-display`} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {showLineNo && <span className="mr-2">{i + 1}</span>}
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export default Index;
