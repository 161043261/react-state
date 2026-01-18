# State

## 路由懒加载

- [方案 1](./src/router/routes.ts)
- [方案 2](./src/router/routes2.ts)
- [方案 3](./src/router/routes3.ts)

## 状态管理

- [Jotai](./src/stores/jotai/)
- [MobX](./src/stores/mobx/)
- [Redux](./src/stores/redux/)
- [Zustand](./src/stores/zustand/)

## Schema Declaration & Validation 模式声明与验证

- [Zod](./src/schemas/)

## radio 和 checkbox

- radio 单选, 如果被选中, 点击该 radio 不会触发 onChange 事件 (只会触发 onClick 事件), 点击其他同 name 的 radio 才会触发 onChange 事件
- checkbox 多选, 如果被选中, 点击该 checkbox 会触发 onChange 事件和 onClick 事件
