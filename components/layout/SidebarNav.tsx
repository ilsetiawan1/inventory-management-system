'use client';
// components/layout/SidebarNav.tsx
// NavItem + NavGroup dalam satu file.
// NavGroup menerima children sebagai JSX children (bukan children prop array).

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

/* ─────────────────────────────────────────────────────────────
   NAV ITEM
───────────────────────────────────────────────────────────── */
interface NavItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive: boolean;
  indent?: boolean;
}

export function NavItem({ label, href, icon, isActive, indent = false }: NavItemProps) {
  return (
    <Link
      href={href}
      data-active={isActive ? '' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: indent ? 10 : 11,
        paddingTop: indent ? 8 : 10,
        paddingBottom: indent ? 8 : 10,
        paddingLeft: indent ? 40 : 11,
        paddingRight: 11,
        borderRadius: 14,
        fontSize: indent ? 13 : 13.5,
        fontWeight: isActive ? 600 : 500,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        position: 'relative',
        transition: 'background 0.18s, color 0.18s, border-color 0.18s',
        background: isActive ? 'rgba(124,58,237,0.08)' : 'transparent',
        color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
        border: isActive ? '1px solid rgba(124,58,237,0.15)' : '1px solid transparent',
      }}
      className="ni"
    >
      {isActive && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 3,
            height: '55%',
            borderRadius: '0 3px 3px 0',
            background: 'var(--color-primary)',
          }}
        />
      )}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: indent ? 24 : 28,
          height: indent ? 24 : 28,
          borderRadius: indent ? 8 : 10,
          flexShrink: 0,
          background: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
          color: isActive ? '#fff' : 'var(--color-text-muted)',
          transition: 'background 0.18s, color 0.18s',
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1, lineHeight: 1.2 }}>{label}</span>

      <style>{`
        .ni:not([data-active]):hover {
          background: var(--color-surface) !important;
          color: var(--color-text-primary) !important;
          border-color: var(--color-border) !important;
        }
      `}</style>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAV GROUP
   Fix: children diterima sebagai JSX children array (bukan prop),
   agar tidak trigger react/no-children-prop ESLint rule.
───────────────────────────────────────────────────────────── */
interface NavGroupChild {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroupProps {
  label: string;
  icon: React.ReactNode;
  // Fix: children sebagai array item, dipass sebagai JSX children
  children: NavGroupChild[];
}

export function NavGroup({ label, icon, children }: NavGroupProps) {
  const pathname = usePathname();
  const isAnyActive = children.some((c) => pathname.startsWith(c.href));
  const [open, setOpen] = useState(isAnyActive);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          padding: '10px 11px',
          borderRadius: 14,
          border: isAnyActive && !open ? '1px solid rgba(124,58,237,0.12)' : '1px solid transparent',
          background: isAnyActive && !open ? 'rgba(124,58,237,0.08)' : 'transparent',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          transition: 'background 0.18s, border-color 0.18s',
        }}
        className="ng-btn"
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 10,
            flexShrink: 0,
            background: isAnyActive ? 'var(--color-primary)' : 'var(--color-surface)',
            color: isAnyActive ? '#fff' : 'var(--color-text-muted)',
            transition: 'background 0.18s, color 0.18s',
          }}
        >
          {icon}
        </span>
        <span
          style={{
            flex: 1,
            fontSize: 13.5,
            fontWeight: isAnyActive ? 600 : 500,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            color: isAnyActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
          }}
        >
          {label}
        </span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'var(--color-text-muted)',
            transition: 'transform 0.22s cubic-bezier(0.4,0,0.2,1)',
            transform: open ? 'rotate(90deg)' : 'none',
          }}
        >
          <ChevronRight
            size={13}
            strokeWidth={2.5}
          />
        </span>
      </button>

      {/* Smooth expand */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.26s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              paddingTop: 4,
              paddingBottom: 2,
              opacity: open ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            {children.map((child) => (
              <NavItem
                key={child.href}
                href={child.href}
                label={child.label}
                icon={child.icon}
                isActive={pathname.startsWith(child.href)}
                indent
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ng-btn:hover {
          background: var(--color-surface) !important;
          border-color: var(--color-border) !important;
        }
      `}</style>
    </div>
  );
}
