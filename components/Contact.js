'use client';

import { useState } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const isSending = status === 'sending';

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || 'Message could not be sent.');
      }

      setStatus('success');
      setFeedback('Thank you. Your message has been sent.');
      setForm(initialForm);
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Message could not be sent.');
    }
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: '#0a0a0a',
        color: '#ffffff',
        padding: 'clamp(76px, 10vw, 128px) 16px clamp(88px, 10vw, 140px)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, #0a0a0a 0%, #101827 46%, #07111f 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(28px, 5vw, 64px)',
          alignItems: 'start',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 46,
                height: 2,
                borderRadius: 2,
                background: 'linear-gradient(to right, transparent, rgba(147,197,253,0.8))',
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(191, 219, 254, 0.78)',
              }}
            >
              Communication
            </p>
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(34px, 5vw, 58px)',
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: 0,
              maxWidth: 620,
            }}
          >
            Send me a message directly.
          </h2>

          <p
            style={{
              margin: '22px 0 0',
              maxWidth: 560,
              color: 'rgba(226, 232, 240, 0.72)',
              fontSize: 'clamp(15px, 2vw, 17px)',
              lineHeight: 1.75,
            }}
          >
            Got a project, internship opportunity, collaboration, or question?
            Write it here and it will go straight to my inbox.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 34,
              color: 'rgba(191, 219, 254, 0.9)',
              fontWeight: 600,
              overflowWrap: 'anywhere',
            }}
          >
            <Mail size={18} />
            <span>mmeslinafs@gmail.com</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: 'rgba(255, 255, 255, 0.055)',
            backdropFilter: 'blur(18px) saturate(150%)',
            WebkitBackdropFilter: 'blur(18px) saturate(150%)',
            borderRadius: 8,
            padding: 'clamp(18px, 4vw, 28px)',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.28)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
              gap: 14,
            }}
          >
            <Field
              icon={<User size={16} />}
              label="Name"
              value={form.name}
              onChange={updateField('name')}
              autoComplete="name"
              required
            />
            <Field
              icon={<Mail size={16} />}
              label="Email"
              type="email"
              value={form.email}
              onChange={updateField('email')}
              autoComplete="email"
              required
            />
          </div>

          <div style={{ marginTop: 14 }}>
            <Field
              icon={<MessageSquare size={16} />}
              label="Subject"
              value={form.subject}
              onChange={updateField('subject')}
              required
            />
          </div>

          <label
            style={{
              display: 'block',
              marginTop: 14,
            }}
          >
            <span style={labelStyle}>Message</span>
            <textarea
              value={form.message}
              onChange={updateField('message')}
              required
              minLength={10}
              rows={6}
              style={{
                ...inputStyle,
                resize: 'vertical',
                minHeight: 150,
                lineHeight: 1.6,
              }}
            />
          </label>

          <button
            type="submit"
            disabled={isSending}
            style={{
              width: '100%',
              minHeight: 48,
              marginTop: 18,
              border: 0,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              background: isSending ? 'rgba(96,165,250,0.58)' : '#60a5fa',
              color: '#06111f',
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: '0.02em',
              cursor: isSending ? 'not-allowed' : 'pointer',
              transition: 'transform 180ms ease, opacity 180ms ease, background 180ms ease',
            }}
          >
            {isSending ? 'Sending...' : 'Send Message'}
            <Send size={16} />
          </button>

          <p
            role="status"
            aria-live="polite"
            style={{
              minHeight: 22,
              margin: '14px 0 0',
              color: status === 'error' ? '#fca5a5' : '#bfdbfe',
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            {feedback}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ icon, label, type = 'text', ...props }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelStyle}>{label}</span>
      <div style={{ position: 'relative' }}>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(191, 219, 254, 0.78)',
            display: 'flex',
            pointerEvents: 'none',
          }}
        >
          {icon}
        </span>
        <input
          type={type}
          style={{
            ...inputStyle,
            paddingLeft: 42,
          }}
          {...props}
        />
      </div>
    </label>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: 8,
  color: 'rgba(226, 232, 240, 0.74)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const inputStyle = {
  width: '100%',
  border: '1px solid rgba(255, 255, 255, 0.13)',
  borderRadius: 8,
  outline: 'none',
  background: 'rgba(2, 6, 23, 0.46)',
  color: '#ffffff',
  padding: '13px 14px',
  fontSize: 14,
  fontFamily: 'inherit',
  transition: 'border-color 180ms ease, box-shadow 180ms ease, background 180ms ease',
};
