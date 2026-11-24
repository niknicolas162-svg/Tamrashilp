'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Clock,
  User,
  ShieldCheck,
  Send,
  AlertTriangle,
  CheckCircle,
  FileText,
  ShoppingBag,
  ExternalLink,
  RotateCcw,
  Eye,
  EyeOff,
  Filter,
  CheckCheck,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/mockData';
import { META_WHATSAPP_TEMPLATES } from '@/lib/whatsapp/service';

interface Message {
  id: string;
  direction: string;
  body: string;
  status: string;
  templateName?: string | null;
  createdAt: string;
}

interface Conversation {
  id: string;
  customerPhone: string;
  customerPhoneMasked: string;
  customerPhoneRaw: string;
  customerName: string | null;
  status: string;
  assignedAgent: string | null;
  linkedOrderId: string | null;
  notes: string | null;
  isWithin24hWindow: boolean;
  hoursRemaining: number;
  updatedAt: string;
  messages: Message[];
}

export default function AdminWhatsAppInboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unassigned' | 'waiting' | 'mine' | 'resolved'>('all');
  const [replyText, setReplyText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedProductSlug, setSelectedProductSlug] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [isRevealedPhone, setIsRevealedPhone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const currentAgent = 'Master Artisan Concierge';

  const savedSnippets = [
    {
      title: 'Workshop Greeting',
      text: 'Namaskar. This is Devendra Kumar Tamta from the Almora atelier. How may I assist you with your copper vessel today?',
    },
    {
      title: 'Ushapan Care Advice',
      text: 'For Ayurvedic dawn hydration, store clean drinking water overnight at room temperature in plain copper. Clean gently with lemon or tamarind and coarse salt.',
    },
    {
      title: 'Kalai Re-tinning Details',
      text: 'Our Almora artisans line cookware with 99.9% pure food-grade tin over oak embers. Re-tinning costs ₹450–₹950 per vessel plus return courier.',
    },
    {
      title: 'Handmade Dispatch Timeline',
      text: 'Every vessel is inspected by hand. Because each piece is raised over the horn anvil without stamping, please allow 2-3 business days for final buffing and packing.',
    },
  ];

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/whatsapp/conversations?filter=${filter}&agent=${encodeURIComponent(currentAgent)}`);
      const data = await res.json();
      if (data.success) {
        setConversations(data.conversations);
        if (!selectedId && data.conversations.length > 0) {
          setSelectedId(data.conversations[0].id);
          setInternalNote(data.conversations[0].notes || '');
        }
      }
    } catch (err) {
      console.error('Failed to load conversations', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [filter]);

  const selectedConv = conversations.find((c) => c.id === selectedId);

  useEffect(() => {
    if (selectedConv) {
      setInternalNote(selectedConv.notes || '');
      setIsRevealedPhone(false);
    }
  }, [selectedId]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConv) return;

    if (!replyText.trim() && !selectedTemplate) {
      return;
    }

    try {
      const res = await fetch('/api/admin/whatsapp/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConv.id,
          text: replyText.trim() || undefined,
          templateName: selectedTemplate || undefined,
          productSlug: selectedProductSlug || undefined,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setActionNotice(`Error: ${data.error}`);
        setTimeout(() => setActionNotice(null), 5000);
        return;
      }

      setReplyText('');
      setSelectedTemplate('');
      setSelectedProductSlug('');
      setActionNotice('Message dispatched successfully');
      setTimeout(() => setActionNotice(null), 3000);
      fetchConversations();
    } catch (err) {
      console.error('Failed to send reply', err);
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedConv) return;
    try {
      await fetch('/api/admin/whatsapp/conversations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConv.id,
          status,
        }),
      });
      fetchConversations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignAgent = async () => {
    if (!selectedConv) return;
    try {
      await fetch('/api/admin/whatsapp/conversations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConv.id,
          assignedAgent: currentAgent,
          status: 'ASSIGNED',
        }),
      });
      fetchConversations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNote = async () => {
    if (!selectedConv) return;
    try {
      await fetch('/api/admin/whatsapp/conversations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConv.id,
          notes: internalNote,
        }),
      });
      setActionNotice('Internal artisan note saved');
      setTimeout(() => setActionNotice(null), 3000);
      fetchConversations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-8 sm:py-12 font-body selection:bg-[#8C4E28] selection:text-[#FAF4E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#B8964F]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="wax-seal w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold">
                TM
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C4E28] font-sans font-semibold">
                Almora Workshop Console
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#12302B]">
              WhatsApp Artisan Inbox
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-lg border border-[#B8964F]/50 text-xs font-serif hover:bg-[#FAF4E8] transition-colors"
            >
              ← Back to Admin Console
            </Link>
            <button
              onClick={fetchConversations}
              className="p-2 rounded-lg border border-[#B8964F]/50 text-[#8C4E28] hover:bg-[#FAF4E8] transition-colors"
              title="Refresh conversations"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
          <span className="text-[10px] uppercase tracking-wider text-[#8C4E28] font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {(['all', 'unassigned', 'waiting', 'mine', 'resolved'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full border text-xs tracking-wider uppercase transition-all ${
                filter === tab
                  ? 'bg-[#12302B] text-[#FAF4E8] border-[#12302B] font-bold'
                  : 'bg-[#FAF4E8] text-[#2A1A12] border-[#B8964F]/40 hover:border-[#8C4E28]'
              }`}
            >
              {tab === 'unassigned'
                ? 'Unassigned'
                : tab === 'waiting'
                ? 'Needs Artisan (Waiting)'
                : tab === 'mine'
                ? 'Assigned to Me'
                : tab === 'resolved'
                ? 'Resolved'
                : 'All Conversations'}
            </button>
          ))}
        </div>

        {actionNotice && (
          <div className="p-3 rounded-xl bg-[#4E6E58]/15 border border-[#4E6E58] text-xs font-serif text-[#12302B] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#4E6E58]" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Main Inbox Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
          {/* Left Column: Conversation List */}
          <div className="lg:col-span-4 bg-[#FAF4E8] rounded-2xl border border-[#B8964F]/40 p-3 space-y-2 shadow-sm overflow-y-auto max-h-[720px] museum-plaque">
            <div className="p-2 border-b border-[#B8964F]/20 text-[10px] uppercase tracking-wider text-[#8C4E28] font-semibold flex justify-between">
              <span>Conversations ({conversations.length})</span>
              <span>DPDP Act Masked</span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-[#2A1A12]/60 font-serif">
                Loading patron conversations…
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#2A1A12]/60 font-serif">
                No conversations found in this filter.
              </div>
            ) : (
              conversations.map((conv) => {
                const isSelected = conv.id === selectedId;
                const lastMsg = conv.messages[conv.messages.length - 1];

                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={`w-full p-3 rounded-xl text-left border transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-[#EFE4CF] border-[#8C4E28] shadow-sm'
                        : 'bg-[#FAF4E8] border-[#B8964F]/25 hover:border-[#8C4E28]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-[#12302B] truncate">
                        {conv.customerName || conv.customerPhoneMasked}
                      </span>
                      <span
                        className={`text-[9px] font-sans uppercase px-2 py-0.5 rounded-full border ${
                          conv.status === 'WAITING_HUMAN'
                            ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                            : conv.status === 'RESOLVED'
                            ? 'bg-gray-100 text-gray-700 border-gray-300'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        {conv.status === 'WAITING_HUMAN' ? 'Waiting' : conv.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#2A1A12]/75 font-body line-clamp-1">
                      {lastMsg ? lastMsg.body : 'No messages yet'}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-[#2A1A12]/50 font-serif pt-1">
                      <span>{conv.customerPhoneMasked}</span>
                      <span>
                        {conv.isWithin24hWindow
                          ? `${conv.hoursRemaining}h left`
                          : 'Window Expired'}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Center Column: Active Conversation Transcript & Reply Box */}
          <div className="lg:col-span-5 bg-[#FAF4E8] rounded-2xl border border-[#B8964F]/40 p-4 sm:p-5 flex flex-col justify-between shadow-sm museum-plaque min-h-[580px]">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="pb-3 border-b border-[#B8964F]/25 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#12302B]">
                      {selectedConv.customerName || 'Honored Patron'}
                    </h3>
                    <p className="text-[10px] text-[#8C4E28] font-sans">
                      {selectedConv.customerPhoneMasked} • Status: {selectedConv.status}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {selectedConv.status !== 'RESOLVED' ? (
                      <button
                        onClick={() => handleUpdateStatus('RESOLVED')}
                        className="px-2.5 py-1 rounded bg-[#4E6E58]/15 text-[#4E6E58] border border-[#4E6E58]/40 hover:bg-[#4E6E58] hover:text-[#FAF4E8] text-[10px] font-sans uppercase tracking-wider transition-colors"
                      >
                        Mark Resolved
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus('OPEN')}
                        className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 border border-gray-300 text-[10px] font-sans uppercase tracking-wider"
                      >
                        Re-open
                      </button>
                    )}
                  </div>
                </div>

                {/* 24-Hour Policy Window Notice */}
                <div
                  className={`my-2 p-2.5 rounded-xl border text-[11px] font-serif leading-tight ${
                    selectedConv.isWithin24hWindow
                      ? 'bg-[#4E6E58]/10 border-[#4E6E58]/30 text-[#12302B]'
                      : 'bg-[#B26A3C]/10 border-[#B26A3C]/40 text-[#8C4E28]'
                  }`}
                >
                  {selectedConv.isWithin24hWindow ? (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#4E6E58]" />
                      <span>
                        24-Hour Customer Window Active: <strong>{selectedConv.hoursRemaining} hours</strong> remaining. Free-form text permitted.
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#8C4E28]" />
                      <span>
                        24-Hour Window Expired: Meta requires an approved template message to initiate contact. Free-form text blocked.
                      </span>
                    </span>
                  )}
                </div>

                {/* Messages Transcript */}
                <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 max-h-[360px]">
                  {selectedConv.messages.map((m) => {
                    const isInbound = m.direction === 'INBOUND';

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${
                          isInbound ? 'items-start' : 'items-end'
                        }`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl text-xs font-body shadow-xs leading-relaxed ${
                            isInbound
                              ? 'bg-[#EFE4CF] text-[#2A1A12] border border-[#B8964F]/30 rounded-tl-none'
                              : 'bg-[#12302B] text-[#FAF4E8] rounded-tr-none'
                          }`}
                        >
                          {m.templateName && (
                            <span className="block text-[9px] uppercase tracking-wider text-[#B8964F] mb-1 font-sans">
                              Template: {m.templateName}
                            </span>
                          )}
                          <p className="whitespace-pre-wrap">{m.body}</p>
                          <div
                            className={`flex items-center justify-end gap-1 text-[9px] mt-1 pt-1 border-t ${
                              isInbound
                                ? 'border-[#B8964F]/20 text-[#2A1A12]/50'
                                : 'border-[#B8964F]/30 text-[#B8964F]'
                            }`}
                          >
                            <span>
                              {new Date(m.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            {!isInbound && (
                              <CheckCheck className="w-3 h-3 text-[#B8964F]" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reply Composer Form */}
                <form onSubmit={handleSendReply} className="pt-3 border-t border-[#B8964F]/25 space-y-2">
                  {/* Saved Replies Snippets Dropdown */}
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => {
                        if (e.target.value) setReplyText(e.target.value);
                      }}
                      defaultValue=""
                      className="text-[11px] p-1.5 rounded-lg bg-[#EFE4CF] border border-[#B8964F]/40 text-[#2A1A12] font-serif"
                    >
                      <option value="">Insert Saved Snippet…</option>
                      {savedSnippets.map((s, idx) => (
                        <option key={idx} value={s.text}>
                          {s.title}
                        </option>
                      ))}
                    </select>

                    <select
                      value={selectedProductSlug}
                      onChange={(e) => setSelectedProductSlug(e.target.value)}
                      className="text-[11px] p-1.5 rounded-lg bg-[#EFE4CF] border border-[#B8964F]/40 text-[#2A1A12] font-serif truncate max-w-[170px]"
                    >
                      <option value="">Recommend Vessel…</option>
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.slug}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {!selectedConv.isWithin24hWindow && (
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-[#8C4E28] font-sans font-semibold">
                        Select Approved Meta Template (Required outside 24h)
                      </label>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg bg-[#EFE4CF] border border-[#8C4E28] text-[#12302B] font-serif"
                      >
                        <option value="">Choose Template…</option>
                        {Object.keys(META_WHATSAPP_TEMPLATES).map((key) => (
                          <option key={key} value={key}>
                            {key} ({META_WHATSAPP_TEMPLATES[key].category})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <textarea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={
                        selectedConv.isWithin24hWindow
                          ? 'Type your message to the patron…'
                          : 'Select an approved template above to initiate message'
                      }
                      disabled={!selectedConv.isWithin24hWindow && !selectedTemplate}
                      className="flex-1 bg-[#EFE4CF]/60 border border-[#B8964F]/40 rounded-xl p-2.5 text-xs text-[#2A1A12] focus:outline-none focus:border-[#8C4E28] font-serif resize-none"
                    />

                    <button
                      type="submit"
                      disabled={!selectedConv.isWithin24hWindow && !selectedTemplate}
                      className="px-4 py-2.5 btn-atelier rounded-xl text-xs uppercase flex items-center justify-center shrink-0 shadow disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="p-12 text-center text-xs text-[#2A1A12]/60 font-serif">
                Select a conversation from the left to read messages.
              </div>
            )}
          </div>

          {/* Right Column: Customer & Order Context Sidebar */}
          <div className="lg:col-span-3 bg-[#FAF4E8] rounded-2xl border border-[#B8964F]/40 p-5 space-y-5 shadow-sm museum-plaque">
            <h3 className="font-serif text-sm font-bold text-[#12302B] border-b border-[#B8964F]/25 pb-2">
              Patron & Order Context
            </h3>

            {selectedConv ? (
              <div className="space-y-4 text-xs font-sans">
                {/* Phone & Identity (DPDP Act Masked with reveal toggle) */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-[#8C4E28] font-semibold block">
                    Contact Phone (DPDP Act)
                  </span>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#EFE4CF] border border-[#B8964F]/30">
                    <span className="font-mono text-xs font-bold text-[#12302B]">
                      {isRevealedPhone ? selectedConv.customerPhoneRaw : selectedConv.customerPhoneMasked}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsRevealedPhone(!isRevealedPhone)}
                      className="p-1 text-[#8C4E28] hover:text-[#12302B]"
                      title={isRevealedPhone ? 'Mask phone' : 'Reveal full phone for support'}
                    >
                      {isRevealedPhone ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Assigned Agent */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-[#8C4E28] font-semibold block">
                    Assigned Artisan
                  </span>
                  <div className="p-2 rounded-lg bg-[#EFE4CF] border border-[#B8964F]/30 flex items-center justify-between">
                    <span>{selectedConv.assignedAgent || 'Unassigned'}</span>
                    {!selectedConv.assignedAgent && (
                      <button
                        onClick={handleAssignAgent}
                        className="text-[10px] text-[#8C4E28] hover:underline font-bold"
                      >
                        Claim
                      </button>
                    )}
                  </div>
                </div>

                {/* Linked Order */}
                {selectedConv.linkedOrderId ? (
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-[#8C4E28] font-semibold block">
                      Linked Order
                    </span>
                    <Link
                      href={`/order/${selectedConv.linkedOrderId}`}
                      className="p-2 rounded-lg bg-[#EFE4CF] border border-[#B8964F]/30 flex items-center justify-between text-xs text-[#8C4E28] hover:underline"
                    >
                      <span>Order #{selectedConv.linkedOrderId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-[#EFE4CF]/60 border border-[#B8964F]/20 text-[11px] text-[#2A1A12]/60 font-serif">
                    No order currently linked to this phone.
                  </div>
                )}

                {/* Internal Workshop Notes */}
                <div className="space-y-1.5 pt-2 border-t border-[#B8964F]/25">
                  <span className="text-[10px] uppercase text-[#8C4E28] font-semibold block">
                    Internal Workshop Notes
                  </span>
                  <textarea
                    rows={3}
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    placeholder="Private notes for other artisans (never shown to customer)…"
                    className="w-full bg-[#EFE4CF] border border-[#B8964F]/30 rounded-lg p-2 text-xs text-[#2A1A12] focus:outline-none focus:border-[#8C4E28] font-serif resize-none"
                  />
                  <button
                    onClick={handleSaveNote}
                    className="w-full py-1.5 rounded-lg bg-[#12302B] text-[#FAF4E8] text-[10px] uppercase tracking-wider font-sans hover:bg-[#1A3D37] transition-colors"
                  >
                    Save Internal Note
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#2A1A12]/50 font-serif">No patron selected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

