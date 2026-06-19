'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Button from '@/components/ui/Button';

export default function RecruiterSettings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="type-display-md text-ink mb-2">Settings</h1>
          <p className="type-body-sm text-body">
            Manage your account preferences and recruiter settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: 'profile', label: 'My Profile', icon: 'lucide:user' },
              { id: 'company', label: 'Company Info', icon: 'lucide:building-2' },
              { id: 'team', label: 'Team & Billing', icon: 'lucide:users' },
              { id: 'notifications', label: 'Notifications', icon: 'lucide:bell' },
              { id: 'integrations', label: 'Integrations', icon: 'lucide:blocks' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-ink text-canvas'
                    : 'bg-canvas text-ink hover:bg-surface-dark border border-transparent hover:border-hairline'
                }`}
              >
                <Icon icon={tab.icon} width={18} />
                <span className="type-body-sm font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {activeTab === 'profile' && (
              <div className="cf-card p-6">
                <h2 className="type-body-lg font-semibold text-ink mb-6">
                  Personal Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-sm bg-surface-dark border border-hairline overflow-hidden">
                      <img
                        src="https://ui-avatars.com/api/?name=Recruiter+User&background=random&size=80"
                        alt="Profile Avatar"
                        className="w-full h-full object-cover grayscale opacity-90"
                      />
                    </div>
                    <div>
                      <Button variant="outline" className="mb-2">
                        Change Photo
                      </Button>
                      <p className="type-mono-caption text-body">
                        JPG or PNG, max 2MB
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block type-mono-caps-eyebrow text-body mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Alex"
                        className="cf-input"
                      />
                    </div>
                    <div>
                      <label className="block type-mono-caps-eyebrow text-body mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Smith"
                        className="cf-input"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block type-mono-caps-eyebrow text-body mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="alex.smith@example.com"
                        className="cf-input"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-hairline flex justify-end">
                    <Button variant="primary">Save Changes</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'company' && (
              <div className="cf-card p-6">
                <h2 className="type-body-lg font-semibold text-ink mb-6">
                  Company Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block type-mono-caps-eyebrow text-body mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      defaultValue="TechCorp Inc."
                      className="cf-input"
                    />
                  </div>
                  <div>
                    <label className="block type-mono-caps-eyebrow text-body mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      defaultValue="https://techcorp.example.com"
                      className="cf-input"
                    />
                  </div>
                  <div>
                    <label className="block type-mono-caps-eyebrow text-body mb-2">
                      Company Size
                    </label>
                    <select className="cf-input appearance-none">
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option selected>51-200 employees</option>
                      <option>201-500 employees</option>
                      <option>500+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block type-mono-caps-eyebrow text-body mb-2">
                      About Company
                    </label>
                    <textarea
                      className="cf-input min-h-[100px] resize-y"
                      defaultValue="We are a leading technology company focused on building innovative solutions."
                    />
                  </div>

                  <div className="pt-4 border-t border-hairline flex justify-end">
                    <Button variant="primary">Save Company Info</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="cf-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="type-body-lg font-semibold text-ink">
                    Team Members
                  </h2>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Icon icon="lucide:user-plus" width={16} />
                    Invite Member
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Alex Smith', email: 'alex@example.com', role: 'Admin' },
                    { name: 'Sarah Jones', email: 'sarah@example.com', role: 'Recruiter' },
                  ].map((member, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border border-hairline rounded-sm bg-surface"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center">
                          <Icon icon="lucide:user" className="text-ink" />
                        </div>
                        <div>
                          <div className="type-body-sm font-semibold text-ink">
                            {member.name}
                          </div>
                          <div className="type-mono-caption text-body">
                            {member.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="type-mono-caption text-ink bg-surface-dark px-2 py-1 rounded-sm border border-hairline">
                          {member.role}
                        </span>
                        {member.role !== 'Admin' && (
                          <button className="text-body hover:text-ink">
                            <Icon icon="lucide:more-vertical" width={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs placeholder */}
            {['notifications', 'integrations'].includes(activeTab) && (
              <div className="cf-card p-12 text-center">
                <Icon
                  icon="lucide:construction"
                  width={48}
                  className="text-body mx-auto mb-4"
                />
                <h2 className="type-display-md text-ink mb-2">
                  Coming Soon
                </h2>
                <p className="type-body-sm text-body max-w-md mx-auto">
                  This settings module is currently under development. Please check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
