"use client";

import React from "react";

interface ButtonConfig {
  label: string;
  onClick: () => void;
}

interface SuccessModalProps {
  open: boolean;
  title?: string;
  message?: string;
  primary?: ButtonConfig; // emphasized action
  secondary?: ButtonConfig; // alternate action
  onClose?: () => void;
}

export default function SuccessModal({
  open,
  title = "Success",
  message,
  primary,
  secondary,
  onClose,
}: SuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>

        {message && <p className="text-gray-600 mb-6">{message}</p>}

        <div className="flex flex-col sm:flex-row gap-3">
          {primary && (
            <button
              onClick={primary.onClick}
              className="flex-1 px-4 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700"
            >
              {primary.label}
            </button>
          )}
          {secondary && (
            <button
              onClick={secondary.onClick}
              className="flex-1 px-4 py-3 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200"
            >
              {secondary.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
