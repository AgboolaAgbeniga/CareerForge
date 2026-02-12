'use client'

import React from 'react'
import { PageContent, ContentDocument, CodeExample, CalloutBox } from '@/lib/content-types'
import { Clock, User, Tag, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContentRendererProps {
  content: PageContent | ContentDocument
  className?: string
}

interface CodeBlockProps {
  code: string
  language: string
  fileName?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  className?: string
}

interface CalloutProps {
  callout: CalloutBox
  className?: string
}

function isPageContent(content: PageContent | ContentDocument): content is PageContent {
  return 'tableOfContents' in content;
}

function Callout({ callout, className }: CalloutProps) {
  const getStyles = (type: string) => {
    switch (type) {
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200'
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200'
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200'
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200'
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return 'ℹ️'
      case 'warning':
        return '⚠️'
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      default:
        return '📝'
    }
  }

  return (
    <div className={cn(
      'my-4 p-4 border rounded-lg',
      getStyles(callout.type),
      className
    )}>
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0 mt-0.5">
          {getIcon(callout.type)}
        </span>
        <div>
          {callout.title && (
            <h4 className="font-semibold mb-2">{callout.title}</h4>
          )}
          <p className="text-sm leading-relaxed">{callout.content}</p>
        </div>
      </div>
    </div>
  )
}

function CodeBlock({ code, language, fileName, showLineNumbers = true, highlightLines = [], className }: CodeBlockProps) {
  const lines = code.split('\n')
  
  return (
    <div className={cn('my-6 rounded-lg overflow-hidden border', className)}>
      {fileName && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b">
          {fileName}
        </div>
      )}
      <div className="relative">
        <pre className={cn(
          'bg-gray-50 dark:bg-gray-900 p-4 overflow-x-auto',
          showLineNumbers && 'pl-12'
        )}>
          <code className={`language-${language} text-sm`}>
            {lines.map((line, index) => {
              const isHighlighted = highlightLines.includes(index + 1)
              return (
                <div 
                  key={index}
                  className={cn(
                    'flex',
                    showLineNumbers && 'pr-4',
                    isHighlighted && 'bg-yellow-100 dark:bg-yellow-900/30'
                  )}
                >
                  {showLineNumbers && (
                    <span className="text-gray-400 dark:text-gray-600 text-right select-none w-8 mr-4">
                      {index + 1}
                    </span>
                  )}
                  <span>{line}</span>
                </div>
              )
            })}
          </code>
        </pre>
        <button
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          onClick={() => navigator.clipboard.writeText(code)}
          title="Copy code"
        >
          📋
        </button>
      </div>
    </div>
  )
}

export function ContentRenderer({ content, className }: ContentRendererProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400'
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'advanced':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400'
      case 'expert':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <article className={cn('prose prose-slate dark:prose-invert max-w-none', className)}>
      {/* Header */}
      <header className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          {content.metadata.title}
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {content.metadata.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{content.metadata.estimatedTime} min read</span>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium capitalize',
              getDifficultyColor(content.metadata.difficulty)
            )}>
              {content.metadata.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{content.metadata.authors.join(', ')}</span>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <div className="flex gap-1">
              {content.metadata.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="ml-auto text-xs">
            Last updated: {new Date(content.metadata.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      {isPageContent(content) && content.tableOfContents.length > 0 && (
        <nav className="mb-8 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
            Table of Contents
          </h2>
          <ul className="space-y-1">
            {content.tableOfContents.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors',
                    item.level === 1 && 'font-medium',
                    item.level === 2 && 'ml-4',
                    item.level === 3 && 'ml-8'
                  )}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Introduction */}
      {isPageContent(content) && content.introduction && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            {content.introduction.title}
          </h2>
          <div
            className="text-slate-700 dark:text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.introduction.content.replace(/\n/g, '<br>') }}
          />
        </section>
      )}

      {/* Main Content Sections */}
      {content.sections.map(section => (
        <section key={section.id} className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            {section.title}
          </h2>
          
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            {section.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return <br key={index} />
              
              // Handle headers
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              }
              
              if (paragraph.startsWith('#### ')) {
                return (
                  <h4 key={index} className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-4 mb-2">
                    {paragraph.replace('#### ', '')}
                  </h4>
                )
              }
              
              // Handle lists
              if (paragraph.trim().startsWith('- ') || paragraph.trim().match(/^\d+\./)) {
                return null // Lists will be handled separately
              }
              
              // Regular paragraphs
              return (
                <p key={index} className="mb-4" dangerouslySetInnerHTML={{ 
                  __html: paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`(.*?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1 rounded">$1</code>')
                }} />
              )
            })}
          </div>

          {/* Lists */}
          {section.lists?.map((list, listIndex) => {
            const ListComponent = list.type === 'ordered' ? 'ol' : 'ul'
            return (
              <ListComponent key={listIndex} className={cn(
                'mb-6 space-y-2',
                list.type === 'ordered' 
                  ? 'list-decimal list-inside ml-4' 
                  : 'list-disc list-inside ml-4'
              )}>
                {list.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-slate-700 dark:text-slate-300">
                    {item}
                  </li>
                ))}
              </ListComponent>
            )
          })}

          {/* Code Examples */}
          {section.codeExamples?.map(example => (
            <div key={example.id}>
              {example.title && (
                <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {example.title}
                </h4>
              )}
              {example.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {example.description}
                </p>
              )}
              <CodeBlock
                code={example.code}
                language={example.language}
                fileName={example.fileName}
                showLineNumbers={example.showLineNumbers}
              />
            </div>
          ))}

          {/* Callout Boxes */}
          {section.calloutBoxes?.map((callout, calloutIndex) => (
            <Callout key={calloutIndex} callout={callout} />
          ))}

          {/* Tables */}
          {section.tables?.map((table, tableIndex) => (
            <div key={tableIndex} className="mb-6">
              {table.caption && (
                <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {table.caption}
                </h4>
              )}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800">
                      {table.headers.map((header, headerIndex) => (
                        <th 
                          key={headerIndex}
                          className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                        {row.map((cell, cellIndex) => (
                          <td 
                            key={cellIndex}
                            className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-slate-700 dark:text-slate-300"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Related Links */}
          {section.relatedLinks && (
            <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Related Links
              </h4>
              <ul className="space-y-2">
                {section.relatedLinks.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {link.text}
                    </a>
                    {link.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {link.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}

      {/* Examples */}
      {isPageContent(content) && content.examples && content.examples.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Examples
          </h2>
          {content.examples.map((example, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {example.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {example.description}
              </p>
              <CodeBlock
                code={example.code}
                language={example.language}
              />
              {example.output && (
                <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Output:
                  </h4>
                  <pre className="text-sm text-slate-700 dark:text-slate-300">
                    {example.output}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Next Steps */}
      {isPageContent(content) && content.nextSteps && (
        <section className="mb-12 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            {content.nextSteps.title}
          </h2>
          <ul className="space-y-3">
            {content.nextSteps.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-blue-700 dark:text-blue-300 hover:underline font-medium"
                >
                  {link.text}
                </a>
                {link.description && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    {link.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Resources */}
      {isPageContent(content) && content.relatedResources && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Related Resources
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {content.relatedResources.map((resource, index) => (
              <a
                key={index}
                href={resource.href}
                className="block p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {resource.text}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}