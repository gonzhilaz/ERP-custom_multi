'use client';

import React, { useState } from 'react';
import { X, Save, Trash2, Plus } from 'lucide-react';

export interface CrudFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: { name: string; label: string; type: string; placeholder?: string; defaultValue?: any }[];
  mode: 'CREATE' | 'EDIT' | 'DELETE';
  onSubmit: (formData: Record<string, any>) => void;
}

export const CrudFormModal: React.FC<CrudFormModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
  mode,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            {mode === 'DELETE' ? (
              <Trash2 className="w-4 h-4 text-red-500" />
            ) : mode === 'EDIT' ? (
              <Save className="w-4 h-4 text-sky-500" />
            ) : (
              <Plus className="w-4 h-4 text-emerald-500" />
            )}
            <span>{title}</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {mode === 'DELETE' ? (
            <p className="text-slate-600 dark:text-slate-300">
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </p>
          ) : (
            fields.map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300">{field.label}:</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                  required
                />
              </div>
            ))
          )}

          {/* Form Actions */}
          <div className="flex justify-end items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all ${
                mode === 'DELETE'
                  ? 'bg-red-600 hover:bg-red-500 shadow-red-600/20'
                  : 'bg-sky-600 hover:bg-sky-500 shadow-sky-600/20'
              }`}
            >
              {mode === 'DELETE' ? 'Hapus Permanent' : mode === 'EDIT' ? 'Simpan Perubahan' : 'Tambah Baru'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
