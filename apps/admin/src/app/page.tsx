'use client';

import React, { useState } from 'react';
import { ShieldCheck, Building2, Server, Activity, Plus } from 'lucide-react';
import { useAdminProvisioner } from '../hooks/useAdminProvisioner';
import { AdminDashboardView } from '../components/AdminDashboardView';
import { ParentProvisionWizard } from '../components/ParentProvisionWizard';
import { VpsDeploymentManager } from '../components/VpsDeploymentManager';

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PROVISION' | 'NODES'>('OVERVIEW');

  const {
    nodes,
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    generatedDockerYaml,
    submitProvisioning
  } = useAdminProvisioner();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 text-xs">
      {/* Top Main Developer Navigation Header */}
      <header className="p-4 bg-slate-900 rounded-3xl border border-slate-800 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <span>Super Admin Developer Control Center</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 font-mono">
                Port 3001 Isolated App
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Parent Provisioning, Database Isolator, & Automated VPS Deployment</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('PROVISION')}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Provision Parent Baru</span>
          </button>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'OVERVIEW' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Overview Infrastructure ({nodes.length} Nodes)</span>
        </button>

        <button
          onClick={() => setActiveTab('PROVISION')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'PROVISION' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Wizard Provisioning Parent Baru</span>
        </button>

        <button
          onClick={() => setActiveTab('NODES')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'NODES' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Manajemen VPS Nodes</span>
        </button>
      </div>

      {/* Active Tab Views */}
      {activeTab === 'OVERVIEW' && <AdminDashboardView nodes={nodes} />}

      {activeTab === 'PROVISION' && (
        <ParentProvisionWizard
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          formData={formData}
          setFormData={setFormData}
          generatedDockerYaml={generatedDockerYaml}
          submitProvisioning={() => {
            submitProvisioning();
            setActiveTab('NODES');
          }}
        />
      )}

      {activeTab === 'NODES' && <VpsDeploymentManager nodes={nodes} />}
    </div>
  );
}
