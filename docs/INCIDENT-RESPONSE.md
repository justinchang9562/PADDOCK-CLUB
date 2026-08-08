# 安全与隐私事件响应 / Security and privacy incident response

1. **确认与控制**：记录发现时间、受影响服务、资料类别和可能的用户范围；撤销泄露密钥、限制访问并保留必要证据。
2. **调查**：检查 Cloudflare、Supabase、GitHub 与应用结构化日志，建立时间线；避免把密码、token、完整邮箱或敏感资料复制到工单。
3. **修复**：修补根因、轮换凭据、重新部署并验证 RLS、Storage、认证与缓存边界。
4. **通知评估**：根据受影响地区、资料敏感度、风险与法定期限，决定是否通知用户、服务商或主管机关；记录判断依据。
5. **恢复与复盘**：监控复发、记录残余风险和永久控制，更新测试、运行手册和本文件。

Production ownership, an on-call contact and a durable privacy/legal email must be assigned before public account registration opens.
