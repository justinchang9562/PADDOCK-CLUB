import Link from "next/link";

export default function NotFound() {
  return (
    <main className="standalone-state">
      <span className="eyebrow">404</span>
      <h1>Out of bounds</h1>
      <p>这个页面不存在，或者数据尚未进入 PADDOCK INDEX。</p>
      <Link className="primary-button" href="/zh">返回首页</Link>
    </main>
  );
}
