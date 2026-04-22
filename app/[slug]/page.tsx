export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

import ScriptDetail from './ScriptDetail';

export default function Page() {
  return <ScriptDetail />;
}
