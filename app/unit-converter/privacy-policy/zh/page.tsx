import type { Metadata } from "next";
import { PolicyLayout } from "../PolicyLayout";

export const metadata: Metadata = {
  title: "隐私政策 – Unit Converter",
  description: "Unit Converter 应用隐私政策（Ejaz Ahmad）。",
};

export default function PrivacyPolicyZh() {
  return (
    <PolicyLayout lang="zh" title="隐私政策">
      <p>
        Ejaz Ahmad 构建了 Unit Converter 应用程序，该应用为免费应用。本服务由 Ejaz Ahmad 提供，旨在按原样使用。
      </p>
      <p>本页面用于告知用户在使用本服务时，有关个人信息的收集、使用和披露政策。</p>
      <p>
        如果您选择使用本服务，即表示您同意按照本隐私政策收集和使用相关信息。所收集的个人信息仅用于提供和改进服务，除本隐私政策所述情况外，不会与任何第三方共享。
      </p>

      <h2>信息收集与使用</h2>
      <p>为了提供更好的用户体验，本应用可能会请求某些必要的信息。这些信息仅存储在您的设备上，不会上传或由开发者直接收集。</p>

      <h2>第三方服务</h2>
      <p>本应用可能使用第三方服务来提升应用稳定性、统计分析或广告展示。这些第三方可能会根据其各自的隐私政策收集信息。</p>
      <p>可能使用的第三方服务包括但不限于：</p>
      <ul>
        <li>华为移动服务（HMS）</li>
        <li>华为广告服务（如适用）</li>
        <li>应用分析服务（用于性能与稳定性）</li>
      </ul>

      <h2>日志数据</h2>
      <p>当应用发生错误时，系统可能会通过第三方工具收集日志数据，包括：</p>
      <ul>
        <li>设备 IP 地址</li>
        <li>设备型号</li>
        <li>操作系统版本</li>
        <li>应用使用时间和日期</li>
        <li>诊断信息</li>
      </ul>
      <p>这些数据仅用于改进应用体验。</p>

      <h2>Cookie 使用</h2>
      <p>本应用不直接使用 Cookie。但所使用的第三方 SDK 可能会使用 Cookie 以提升服务质量。</p>

      <h2>服务提供商</h2>
      <p>开发者可能会使用第三方服务来：</p>
      <ul>
        <li>提供和维护服务</li>
        <li>分析服务使用情况</li>
      </ul>
      <p>这些第三方仅可在授权范围内使用信息，不得用于其他目的。</p>

      <h2>信息安全</h2>
      <p>我们重视您的信息安全，并采取合理的安全措施。但请注意，没有任何一种互联网传输或电子存储方式是 100% 安全的。</p>

      <h2>第三方链接</h2>
      <p>本应用可能包含第三方网站链接。开发者不对这些网站的内容或隐私政策负责。</p>

      <h2>儿童隐私</h2>
      <p>本服务不面向 13 岁以下儿童。如发现儿童提供了个人信息，我们将立即删除。</p>

      <h2>隐私政策的变更</h2>
      <p>我们可能不时更新本隐私政策，更新内容将发布在本页面。</p>
      <p>生效日期：2023-10-09</p>

      <h2>联系方式</h2>
      <p>
        如有任何隐私相关问题，请通过以下方式联系：
        <br />
        📧 <a href="mailto:eejazzahmad@gmail.com">eejazzahmad@gmail.com</a>
      </p>
    </PolicyLayout>
  );
}
