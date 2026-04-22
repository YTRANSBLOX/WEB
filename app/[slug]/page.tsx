import ScriptDetail from './ScriptDetail';

export async function generateStaticParams() {
  'use server';
  return [];
}

export default function Page() {
  return <ScriptDetail />;
}
