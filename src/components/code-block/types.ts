type DynamicRawImport = () => Promise<{ default: string }>;

interface IProps {
  // 源代码
  content?: string;
  // 动态导入源文件, 使用 ?raw 后缀
  dynamicRawImport?: DynamicRawImport;
  // 语言类型
  lang: string;
  // 是否显示行号
  showLineNo?: boolean;
}

interface IState {
  content: string;
  loading: boolean;
  error: string;
}

type Action =
  | { type: "start" }
  | { type: "success"; payload: string }
  | { type: "error"; content: string };

export type { DynamicRawImport, IProps, IState, Action };
