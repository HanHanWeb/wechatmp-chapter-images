# wechatmp-chapter-images

微信公众号章节标题图片生成器。基于 Vue 3、Ant Design Vue 和 Lucide，所有编辑和图片处理均在浏览器内完成。

## 功能

- 自定义章节编号与两行标题，支持在画布中点击编辑。
- 两行标题均可匹配强调文字；可调字号、字重与颜色。
- DIN 编号与思源宋体，字体通过 jsDelivr 分片加载。
- 左文右图或左图右文；插图自由拖拽、X/Y 定位、大小调整。
- 上传 PNG、JPG、WebP 或 SVG 插图与背景，单张不超过 15 MB。
- 默认白底，可自选纯色或图片背景；支持裁切铺满、完整显示及拉伸。
- PNG/JPG 导出，支持 1×、2× 和 3× 清晰度。
- 本地自动保存；尚未导出就刷新时，可选择恢复进度或重新开始。
- 适配手机：底部折叠编辑面板、独立导出设置和安全区。

## 本地开发

需要 Node.js 22 或更高版本。

```sh
npm ci
npm run build
npm run dev
```

打开 http://127.0.0.1:4173 。修改 `app/` 源码后重新运行 `npm run build`，刷新页面即可。

## Cloudflare Pages 部署

```sh
npx --yes wrangler@4.151.3 login
npx --yes wrangler@4.151.3 pages project create wechatmp-chapter-images --production-branch main
npm run deploy
```

Pages 项目只需创建一次。后续更新源码、推送 GitHub 后，执行 `npm run deploy` 发布。

若在 Cloudflare 控制台通过 Git 仓库配置构建，使用：

| 设置 | 值 |
| --- | --- |
| 生产分支 | `main` |
| 构建命令 | `npm run build` |
| 构建输出目录 | `dist` |
| Node.js 版本 | `22` 或更高 |

## 项目结构

- `app/app.js`：编辑器界面、画布交互与图片导出。
- `app/style.css`：桌面与手机布局。
- `app/draft-storage.js`：浏览器图片草稿存储。
- `app/source-han-serif.css`：思源宋体可变字重及 CDN 分片声明。
- `app/public/favicon.svg`：站点图标。
- `wrangler.jsonc`：Cloudflare Pages 配置。

草稿保存在当前浏览器的 localStorage 和 IndexedDB；清除站点数据会删除草稿。字体首次使用需要联网。GitHub 源码和 Cloudflare 部署不包含个人草稿。
