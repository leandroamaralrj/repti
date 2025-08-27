import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutDashboard,
  Boxes,
  FileText,
  Users,
  Wrench,
  LogOut,
  Plus,
  Trash2,
  Search,
  Layers,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

// Paleta de cores: tons de azul/cinza/branco
const COLORS = {
  primary: "#0F60B6",
  primaryDark: "#0B4A8A",
  accent: "#1E88E5",
  gray100: "#F8FAFC",
  gray200: "#EDF2F7",
  gray300: "#E2E8F0",
  gray500: "#64748B",
  gray700: "#334155",
  white: "#FFFFFF",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
};

const AppShell = ({ children, onNavigate, current, onLogout }) => {
  const nav = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { key: "assets", label: "Gestão de Ativos", icon: <Boxes size={18} /> },
    { key: "asset_new", label: "Cadastro de Ativo", icon: <Plus size={18} /> },
    { key: "people", label: "Gestão de Pessoas", icon: <Users size={18} /> },
    { key: "maintenance", label: "Histórico e Manutenção", icon: <Wrench size={18} /> },
    { key: "reports", label: "Relatórios", icon: <FileText size={18} /> },
    { key: "disposal", label: "Baixa de Ativo", icon: <Trash2 size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[${COLORS.gray100}] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden md:flex md:flex-col">
        <div className="px-6 py-5 border-b border-slate-200">
          <div className="text-xl font-semibold text-slate-800">Revvo • Inventário TI</div>
          <div className="text-xs text-slate-500 mt-1">Plataforma de Gestão de Ativos</div>
        </div>
        <nav className="p-3 flex-1 space-y-1">
          {nav.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition shadow-sm border ${
                current === item.key
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Topbar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="md:hidden">
                {/* Mobile menu */}
                <select
                  className="border rounded-lg px-3 py-2 text-sm"
                  value={current}
                  onChange={(e) => onNavigate(e.target.value)}
                >
                  <option value="dashboard">Dashboard</option>
                  <option value="assets">Gestão de Ativos</option>
                  <option value="asset_new">Cadastro de Ativo</option>
                  <option value="people">Gestão de Pessoas</option>
                  <option value="maintenance">Histórico e Manutenção</option>
                  <option value="reports">Relatórios</option>
                  <option value="disposal">Baixa de Ativo</option>
                </select>
              </div>
              <h1 className="text-lg sm:text-xl font-semibold text-slate-800">{labelFromKey(current)}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={14} /> Acesso seguro (gestores e técnicos)
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const labelFromKey = (key) =>
  ({
    dashboard: "Dashboard",
    assets: "Gestão de Ativos",
    asset_new: "Cadastro de Ativo",
    people: "Gestão de Pessoas",
    maintenance: "Histórico e Manutenção",
    reports: "Relatórios",
    disposal: "Baixa de Ativo",
  }[key] || "");

// Dados de exemplo (mock) para navegação realista
const initialAssets = [
  {
    id: 1,
    serial: "RV-NT-001",
    model: "Dell Latitude 7430",
    dept: "Desenvolvimento",
    status: "Em uso",
    value: 8500,
    life: 36,
    assignedTo: "Rafaela",
  },
  {
    id: 2,
    serial: "RV-MO-104",
    model: "LG 27'' UltraFine",
    dept: "Design",
    status: "Estoque",
    value: 1400,
    life: 60,
    assignedTo: null,
  },
  {
    id: 3,
    serial: "RV-NT-019",
    model: "Apple MacBook Pro 14",
    dept: "Diretoria",
    status: "Em manutenção",
    value: 14500,
    life: 48,
    assignedTo: "Leandro",
  },
];

const initialPeople = [
  { id: 1, name: "Leandro Amaral", dept: "Diretoria" },
  { id: 2, name: "Rafaela", dept: "Desenvolvimento" },
  { id: 3, name: "Diego", dept: "Negócios" },
  { id: 4, name: "Bruno", dept: "Design" },
];

const initialMaintenance = [
  { id: 1, serial: "RV-NT-019", date: "2025-08-01", supplier: "TechFix Ltda.", cost: 950, notes: "Troca de teclado" },
];

export default function App() {
  const [route, setRoute] = useState("login");
  const [assets, setAssets] = useState(initialAssets);
  const [people, setPeople] = useState(initialPeople);
  const [maintenance, setMaintenance] = useState(initialMaintenance);
  const [user, setUser] = useState(null);

  // Simples auth mock
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const role = form.get("role");
    setUser({ email, role });
    setRoute("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setRoute("login");
  };

  // Navegação controlada
  const navigate = (key) => setRoute(key);

  const screen = useMemo(() => {
    switch (route) {
      case "login":
        return (
          <LoginScreen onSubmit={handleLogin} />
        );
      default:
        return (
          <AppShell onNavigate={navigate} current={route} onLogout={handleLogout}>
            <motion.div
              key={route}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {route === "dashboard" && (
                <Dashboard assets={assets} maintenance={maintenance} />
              )}
              {route === "assets" && (
                <AssetsList
                  assets={assets}
                  onAddNew={() => setRoute("asset_new")}
                  onUpdate={(next) => setAssets(next)}
                />
              )}
              {route === "asset_new" && (
                <AssetForm
                  onCancel={() => setRoute("assets")}
                  onSave={(asset) => {
                    setAssets((prev) => [
                      { ...asset, id: prev.length ? Math.max(...prev.map((a) => a.id)) + 1 : 1 },
                      ...prev,
                    ]);
                    setRoute("assets");
                  }}
                />
              )}
              {route === "people" && (
                <PeoplePage
                  people={people}
                  assets={assets}
                  onAllocate={(serial, personId) => {
                    setAssets((prev) =>
                      prev.map((a) =>
                        a.serial === serial
                          ? {
                              ...a,
                              assignedTo: people.find((p) => p.id === personId)?.name || null,
                              status: "Em uso",
                            }
                          : a
                      )
                    );
                  }}
                />
              )}
              {route === "maintenance" && (
                <MaintenancePage
                  items={maintenance}
                  onAdd={(item) => setMaintenance((prev) => [{ ...item, id: prev.length + 1 }, ...prev])}
                />
              )}
              {route === "reports" && (
                <ReportsPage assets={assets} maintenance={maintenance} />
              )}
              {route === "disposal" && (
                <DisposalPage
                  assets={assets}
                  onDispose={(serial, type) => {
                    setAssets((prev) =>
                      prev.map((a) =>
                        a.serial === serial ? { ...a, status: `Baixado (${type})`, assignedTo: null } : a
                      )
                    );
                  }}
                />
              )}
            </motion.div>
          </AppShell>
        );
    }
  }, [route, assets, maintenance, people]);

  return <div className="font-sans">{screen}</div>;
}

// ============== Login ==============
function LoginScreen({ onSubmit }) {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-blue-50 to-slate-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-blue-600 grid place-items-center text-white font-bold">IT</div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Inventário de TI</h2>
            <p className="text-xs text-slate-500">Acesso para gestores e técnicos</p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-700">E-mail corporativo</label>
            <input name="email" type="email" required className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-100" placeholder="nome@empresa.com" />
          </div>
          <div>
            <label className="text-sm text-slate-700">Senha</label>
            <input name="password" type="password" required className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-100" placeholder="••••••••" />
          </div>
          <div>
            <label className="text-sm text-slate-700">Perfil</label>
            <select name="role" className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2">
              <option>Gestor</option>
              <option>Técnico</option>
            </select>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">Entrar</button>
        </form>
        <p className="text-[11px] text-slate-500 mt-4">[Protótipo] Autenticação simulada. Dados não são persistidos.</p>
      </div>
    </div>
  );
}

// ============== Dashboard ==============
function Dashboard({ assets, maintenance }) {
  const kpis = useMemo(() => {
    const inUse = assets.filter((a) => a.status === "Em uso").length;
    const stock = assets.filter((a) => a.status === "Estoque").length;
    const repair = assets.filter((a) => a.status === "Em manutenção").length;
    const totalCost = assets.reduce((acc, a) => acc + a.value, 0);
    const depreciation = assets.reduce((acc, a) => acc + a.value * 0.35, 0); // simplificado
    return { inUse, stock, repair, totalCost, depreciation };
  }, [assets]);

  const deptData = useMemo(() => {
    const map = {};
    assets.forEach((a) => (map[a.dept] = (map[a.dept] || 0) + 1));
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [assets]);

  const statusData = useMemo(() => {
    const keys = ["Em uso", "Estoque", "Em manutenção"];
    const colors = [COLORS.primary, COLORS.gray500, COLORS.warning];
    return keys.map((k, i) => ({ name: k, value: assets.filter((a) => a.status === k).length, color: colors[i] }));
  }, [assets]);

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI title="Ativos em uso" value={kpis.inUse} helper="equipamentos" />
        <KPI title="Em estoque" value={kpis.stock} helper="unidades" />
        <KPI title="Em manutenção" value={kpis.repair} helper="chamados" />
        <KPI title="Custos totais" value={formatBRL(kpis.totalCost)} helper="valor de compra" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-800">Ativos por Departamento</h3>
            <Layers size={16} className="text-slate-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill={COLORS.accent} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-800">Distribuição por Status</h3>
            <ClipboardList size={16} className="text-slate-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-800 mb-3">Depreciação acumulada</h3>
          <div className="text-3xl font-bold text-slate-800">{formatBRL(kpis.depreciation)}</div>
          <p className="text-sm text-slate-500">Estimativa baseada em 35% dos custos totais (exemplo).
          </p>
        </div>
      </div>
    </div>
  );
}

function KPI({ title, value, helper }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{helper}</div>
    </div>
  );
}

// ============== Gestão de Ativos ==============
function AssetsList({ assets, onAddNew, onUpdate }) {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("");
  const [status, setStatus] = useState("");

  const filtered = assets.filter((a) => {
    const f1 = !q || a.serial.toLowerCase().includes(q.toLowerCase());
    const f2 = !dept || a.dept === dept;
    const f3 = !status || a.status === status;
    return f1 && f2 && f3;
  });

  const depts = Array.from(new Set(assets.map((a) => a.dept)));
  const statuses = ["Em uso", "Estoque", "Em manutenção", "Baixado (descartado)", "Baixado (vendido)", "Baixado (doado)"];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 flex items-center gap-2 border rounded-xl px-3 py-2 bg-white">
          <Search size={16} className="text-slate-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por número de série" className="flex-1 outline-none text-sm" />
        </div>
        <select value={dept} onChange={(e) => setDept(e.target.value)} className="border rounded-xl px-3 py-2 bg-white">
          <option value="">Departamento (todos)</option>
          {depts.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded-xl px-3 py-2 bg-white">
          <option value="">Status (todos)</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button onClick={onAddNew} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
          <Plus size={16} /> Adicionar novo ativo
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <Th>Serial</Th>
              <Th>Modelo</Th>
              <Th>Departamento</Th>
              <Th>Status</Th>
              <Th>Valor</Th>
              <Th>Vida útil (meses)</Th>
              <Th>Alocado para</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-t hover:bg-slate-50">
                <Td>{a.serial}</Td>
                <Td>{a.model}</Td>
                <Td>{a.dept}</Td>
                <Td><StatusBadge status={a.status} /></Td>
                <Td>{formatBRL(a.value)}</Td>
                <Td>{a.life}</Td>
                <Td>{a.assignedTo || <span className="text-slate-400">—</span>}</Td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-6 text-center text-slate-500">Nenhum ativo encontrado com os filtros atuais.</div>
        )}
      </div>
    </div>
  );
}

const Th = ({ children }) => (
  <th className="px-4 py-3 text-left font-medium">{children}</th>
);
const Td = ({ children }) => (
  <td className="px-4 py-3 text-slate-700">{children}</td>
);

const StatusBadge = ({ status }) => {
  const map = {
    "Em uso": "bg-blue-50 text-blue-700 border-blue-200",
    "Estoque": "bg-slate-50 text-slate-700 border-slate-200",
    "Em manutenção": "bg-amber-50 text-amber-700 border-amber-200",
  };
  const style = map[status] || "bg-slate-50 text-slate-700 border-slate-200";
  return <span className={`text-xs px-2 py-1 rounded-lg border ${style}`}>{status}</span>;
};

// ============== Cadastro de Ativo ==============
function AssetForm({ onCancel, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const asset = {
      serial: data.get("serial"),
      model: data.get("model"),
      value: Number(data.get("value")),
      life: Number(data.get("life")),
      status: data.get("status"),
      dept: data.get("dept"),
      assignedTo: null,
    };
    onSave(asset);
  };
  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Novo Ativo</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Número de série"><input name="serial" required className="input" placeholder="Ex: RV-NT-020" /></Field>
          <Field label="Modelo"><input name="model" required className="input" placeholder="Ex: Lenovo T14" /></Field>
          <Field label="Valor de compra (R$)"><input name="value" type="number" min="0" className="input" /></Field>
          <Field label="Vida útil (meses)"><input name="life" type="number" min="1" className="input" defaultValue={36} /></Field>
          <Field label="Departamento"><input name="dept" className="input" placeholder="Ex: Desenvolvimento" /></Field>
          <Field label="Status inicial">
            <select name="status" className="input">
              <option>Estoque</option>
              <option>Em uso</option>
              <option>Em manutenção</option>
            </select>
          </Field>

          <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl border border-slate-300 bg-white">Cancelar</button>
            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">Salvar ativo</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Field = ({ label, children }) => (
  <label className="text-sm text-slate-700">
    <div className="mb-1">{label}</div>
    <div className="">{children}</div>
  </label>
);

// ============== Gestão de Pessoas ==============
function PeoplePage({ people, assets, onAllocate }) {
  const [show, setShow] = useState(false);
  const [choice, setChoice] = useState({ personId: "", serial: "" });
  const [term, setTerm] = useState(null);

  const freeAssets = assets.filter((a) => a.status !== "Em manutenção");

  const handleAllocate = (e) => {
    e.preventDefault();
    const pId = Number(choice.personId);
    if (!pId || !choice.serial) return;
    onAllocate(choice.serial, pId);
    const p = people.find((x) => x.id === pId);
    const a = assets.find((x) => x.serial === choice.serial);
    setTerm({
      date: new Date().toLocaleDateString("pt-BR"),
      person: p?.name,
      dept: p?.dept,
      serial: a?.serial,
      model: a?.model,
    });
    setShow(false);
  };

  const downloadTerm = () => {
    if (!term) return;
    const content = `TERMO DE RESPONSABILIDADE\n\nDeclaro receber o equipamento abaixo e responsabilizar-me por sua guarda e uso adequado.\n\nColaborador: ${term.person}\nDepartamento: ${term.dept}\nSerial: ${term.serial}\nModelo: ${term.model}\nData: ${term.date}\n\nAssinatura: _____________________________`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Termo_${term.person?.replaceAll(" ", "_")}_${term.serial}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-800 font-semibold">Colaboradores & Departamentos</h3>
        <button onClick={() => setShow(true)} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">Alocar ativo</button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <Th>Nome</Th>
              <Th>Departamento</Th>
              <Th>Ativos em uso</Th>
            </tr>
          </thead>
          <tbody>
            {people.map((p) => (
              <tr key={p.id} className="border-t hover:bg-slate-50">
                <Td>{p.name}</Td>
                <Td>{p.dept}</Td>
                <Td>
                  {assets.filter((a) => a.assignedTo === p.name).map((a) => a.serial).join(", ") || (
                    <span className="text-slate-400">—</span>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {term && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="font-medium text-blue-800">Termo de responsabilidade gerado</div>
            <div className="text-sm text-blue-700">{term.person} • {term.serial} • {term.date}</div>
          </div>
          <button onClick={downloadTerm} className="px-3 py-2 rounded-xl bg-blue-600 text-white">Baixar termo</button>
        </div>
      )}

      <Modal show={show} onClose={() => setShow(false)} title="Alocar ativo">
        <form onSubmit={handleAllocate} className="space-y-3">
          <label className="block text-sm">
            <span className="text-slate-700">Colaborador</span>
            <select
              className="mt-1 input"
              value={choice.personId}
              onChange={(e) => setChoice((c) => ({ ...c, personId: e.target.value }))}
            >
              <option value="">Selecione</option>
              {people.map((p) => (
                <option key={p.id} value={p.id}>{p.name} — {p.dept}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-slate-700">Ativo</span>
            <select
              className="mt-1 input"
              value={choice.serial}
              onChange={(e) => setChoice((c) => ({ ...c, serial: e.target.value }))}
            >
              <option value="">Selecione</option>
              {freeAssets.map((a) => (
                <option key={a.serial} value={a.serial}>{a.serial} — {a.model} ({a.status})</option>
              ))}
            </select>
          </label>
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={() => setShow(false)} className="px-3 py-2 rounded-xl border">Cancelar</button>
            <button className="px-3 py-2 rounded-xl bg-blue-600 text-white">Confirmar alocação</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// ============== Histórico & Manutenção ==============
function MaintenancePage({ items, onAdd }) {
  const handleAdd = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onAdd({
      serial: data.get("serial"),
      date: data.get("date"),
      supplier: data.get("supplier"),
      cost: Number(data.get("cost")),
      notes: data.get("notes"),
    });
    e.currentTarget.reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <Th>Data</Th>
              <Th>Serial</Th>
              <Th>Fornecedor</Th>
              <Th>Custo</Th>
              <Th>Observações</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className="border-t hover:bg-slate-50">
                <Td>{formatDate(i.date)}</Td>
                <Td>{i.serial}</Td>
                <Td>{i.supplier}</Td>
                <Td>{formatBRL(i.cost)}</Td>
                <Td>{i.notes}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <h4 className="font-semibold text-slate-800 mb-3">Registrar manutenção</h4>
        <form onSubmit={handleAdd} className="space-y-3">
          <label className="block text-sm">
            <span className="text-slate-700">Número de série</span>
            <input name="serial" required className="input" placeholder="Ex: RV-NT-001" />
          </label>
          <label className="block text-sm">
            <span className="text-slate-700">Data</span>
            <input name="date" type="date" required className="input" />
          </label>
          <label className="block text-sm">
            <span className="text-slate-700">Fornecedor</span>
            <input name="supplier" className="input" placeholder="Ex: TechFix" />
          </label>
          <label className="block text-sm">
            <span className="text-slate-700">Custo (R$)</span>
            <input name="cost" type="number" min="0" className="input" />
          </label>
          <label className="block text-sm">
            <span className="text-slate-700">Observações</span>
            <textarea name="notes" rows={3} className="input" placeholder="Descrição do reparo" />
          </label>
          <div className="pt-2 flex justify-end">
            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============== Relatórios ==============
function ReportsPage({ assets, maintenance }) {
  const exportCSV = (rows, filename) => {
    const header = Object.keys(rows[0] || {}).join(",");
    const body = rows.map((r) => Object.values(r).join(",")).join("\n");
    const csv = header + "\n" + body;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printPDF = () => window.print();

  const invByDept = useMemo(() => {
    const map = {};
    assets.forEach((a) => {
      if (!map[a.dept]) map[a.dept] = [];
      map[a.dept].push(a);
    });
    return map;
  }, [assets]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center gap-3">
        <button onClick={() => exportCSV(assets, "inventario-completo")} className="px-4 py-2 rounded-xl border">Exportar Excel (CSV)</button>
        <button onClick={printPDF} className="px-4 py-2 rounded-xl bg-blue-600 text-white">Exportar PDF</button>
        <span className="text-xs text-slate-500">* Protótipo: exportação simplificada</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-800 mb-2">Inventário por departamento</h4>
          {Object.entries(invByDept).map(([dept, list]) => (
            <div key={dept} className="mb-4">
              <div className="text-sm font-medium text-slate-700 mb-1">{dept}</div>
              <div className="text-sm text-slate-600">{list.map((x) => x.serial).join(", ")}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-800 mb-2">Custos acumulados</h4>
          <div className="text-2xl font-bold text-slate-900">{formatBRL(assets.reduce((acc, a) => acc + a.value, 0))}</div>
          <p className="text-sm text-slate-500">Soma dos valores de compra cadastrados.</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-800 mb-2">Depreciação</h4>
          <div className="text-2xl font-bold text-slate-900">{formatBRL(assets.reduce((acc, a) => acc + a.value * 0.35, 0))}</div>
          <p className="text-sm text-slate-500">Estimativa simples para demonstração.</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-800 mb-2">Manutenções registradas</h4>
          <ul className="list-disc pl-5 text-sm text-slate-700">
            {maintenance.map((m) => (
              <li key={m.id}>{formatDate(m.date)} — {m.serial} — {m.supplier} — {formatBRL(m.cost)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============== Baixa de Ativo ==============
function DisposalPage({ assets, onDispose }) {
  const [serial, setSerial] = useState("");
  const [type, setType] = useState("descartado");
  const handle = (e) => {
    e.preventDefault();
    if (!serial) return;
    onDispose(serial, type);
    setSerial("");
  };

  return (
    <div className="max-w-xl bg-white rounded-2xl border border-slate-200 p-6">
      <h4 className="font-semibold text-slate-800 mb-4">Baixa de ativo</h4>
      <form onSubmit={handle} className="space-y-3">
        <label className="block text-sm">
          <span className="text-slate-700">Número de série</span>
          <input value={serial} onChange={(e) => setSerial(e.target.value)} className="input" placeholder="Ex: RV-NT-001" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Tipo de baixa</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className="input">
            <option value="descartado">Descartado</option>
            <option value="vendido">Vendido</option>
            <option value="doado">Doado</option>
          </select>
        </label>
        <div className="pt-2 flex justify-end">
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white">Confirmar</button>
        </div>
      </form>
      <div className="mt-4 text-sm text-slate-500">Ao confirmar, o ativo é marcado como "Baixado (tipo)" e deixa de aparecer nas listagens operacionais.</div>
    </div>
  );
}

// ============== Componentes utilitários ==============
function Modal({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-slate-800">{title}</div>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function formatBRL(n) {
  try {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  } catch {
    return `R$ ${Number(n).toFixed(2)}`;
  }
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR");
  } catch { return iso; }
}

// Tailwind helper: apply to all inputs
const style = document.createElement("style");
style.innerHTML = `.input{width:100%;border:1px solid #E2E8F0;border-radius:0.75rem;padding:0.5rem 0.75rem;outline:none} .input:focus{box-shadow:0 0 0 6px rgba(59,130,246,0.12);border-color:#93C5FD}`;
document.head.appendChild(style);
