"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="standalone-state">
      <span className="eyebrow">DATA INTERRUPTION</span>
      <h1>We lost the signal</h1>
      <p>上游数据暂时无法读取。你可以重试，或继续浏览本地百科内容。</p>
      <button className="primary-button" type="button" onClick={reset}>重新连接 / Retry</button>
    </main>
  );
}
