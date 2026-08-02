#!/bin/zsh

set -u
unsetopt BG_NICE

PROJECT_DIR="${0:A:h}"
SITE_URL="http://127.0.0.1:3000/zh"

cd "$PROJECT_DIR" || exit 1
clear

echo "========================================"
echo "       PADDOCK INDEX 本地启动工具"
echo "========================================"
echo

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "未检测到 Node.js 或 npm。"
  echo "请先安装 Node.js 20.9 或更高版本，然后重新双击此文件。"
  echo
  read "?按回车键关闭窗口……"
  exit 1
fi

echo "Node.js：$(node --version)"
echo "npm：$(npm --version)"
echo

if curl --silent --fail --max-time 2 "$SITE_URL" >/dev/null 2>&1; then
  echo "PADDOCK INDEX 已经在运行，正在打开浏览器……"
  open "$SITE_URL"
  echo
  read "?按回车键关闭窗口……"
  exit 0
fi

if [[ ! -d "node_modules" ]]; then
  echo "首次运行：正在安装项目依赖，请稍候……"
  echo
  npm install

  if [[ $? -ne 0 ]]; then
    echo
    echo "依赖安装失败，请检查网络连接和上方的错误信息。"
    read "?按回车键关闭窗口……"
    exit 1
  fi

  echo
  echo "依赖安装完成。"
  echo
fi

echo "正在启动 PADDOCK INDEX……"
echo "网站地址：$SITE_URL"
echo "关闭此终端窗口或按 Control + C 即可停止网站。"
echo

(
  for attempt in {1..60}; do
    if curl --silent --fail --max-time 2 "$SITE_URL" >/dev/null 2>&1; then
      open "$SITE_URL"
      exit 0
    fi
    sleep 1
  done
) &

npm run dev -- --hostname 127.0.0.1 --port 3000
EXIT_CODE=$?

echo
if [[ $EXIT_CODE -eq 0 ]]; then
  echo "PADDOCK INDEX 已停止运行。"
else
  echo "PADDOCK INDEX 启动失败，退出代码：$EXIT_CODE"
  echo "请查看上方终端信息定位原因。"
fi
echo
read "?按回车键关闭窗口……"
exit $EXIT_CODE
