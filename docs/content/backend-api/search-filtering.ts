// Backend API Search & Filtering Content
import { PageContent } from '@/lib/content-types'

export const backendApiSearchFilteringContent: PageContent = {
  metadata: {
    title: "Search & Filtering API",
    description: "Advanced search capabilities, filtering options, and query optimization for CareerForge platform",
    version: "1.0.0",
    lastUpdated: "2024-12-28",
    authors: ["Backend Engineering Team"],
    tags: ["api", "search", "filtering", "query", "optimization"],
    difficulty: "intermediate",
    estimatedTime: 17
  },
  tableOfContents: [
    { id: "search-overview", title: "Search & Filtering Overview", level: 1 },
    { id: "search-architecture", title: "Search Architecture", level: 1 },
    { id: "query-syntax", title: "Query Syntax & Operators", level: 1 },
    { id: "filtering-options", title: "Filtering Options", level: 1 },
    { id: "sorting-pagination", title: "Sorting & Pagination", level: 1 },
    { id: "search-optimization", title: "Search Optimization", level: 1 },
    { id: "search-analytics", title: "Search Analytics", level: 1 },
    { id: "search-endpoints", title: "Search & Filtering Endpoints", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Search & Filtering API",
    content: `The Search & Filtering API provides powerful, scalable search capabilities across all CareerForge entities including jobs, companies, users, and applications. Built on advanced indexing and query optimization technologies, this API delivers fast, relevant results with comprehensive filtering options.`
  },
  sections: [
    {
      id: "search-overview",
      title: "Search & Filtering Overview",
      content: `CareerForge's search system is designed to handle complex queries across multiple data types with sub-second response times. The API supports full-text search, faceted filtering, geospatial queries, and personalized result ranking.

### Key Features

- **Multi-Entity Search**: Search across jobs, companies, users, and applications
- **Advanced Query Language**: Boolean operators, fuzzy matching, proximity search
- **Real-time Indexing**: Automatic indexing with minimal latency
- **Personalized Results**: User-specific result ranking and recommendations
- **Analytics Integration**: Search behavior tracking and optimization
- **Scalable Architecture**: Horizontal scaling with sharding support

### Search Architecture

\`\`\`mermaid
graph TB
    A[API Request] --> B[Query Parser]
    B --> C[Query Optimizer]
    C --> D[Index Router]
    D --> E[(Primary Index)]
    D --> F[(Secondary Index)]
    E --> G[Result Merger]
    F --> G
    G --> H[Result Ranker]
    H --> I[Response Formatter]
    I --> J[API Response]
\`\`\`

### Supported Search Types

#### Full-Text Search
- Natural language queries
- Keyword extraction and matching
- Relevance scoring with BM25 algorithm
- Synonym expansion and stemming

#### Structured Filtering
- Exact field matching
- Range queries (salary, date, numeric)
- Geospatial queries (location-based)
- Faceted navigation

#### Semantic Search
- AI-powered semantic understanding
- Context-aware result ranking
- Personalized recommendations
- Query intent recognition`,
      calloutBoxes: [
        {
          type: "info",
          title: "Search Performance",
          content: "Average search response time is under 100ms with 99.9% availability and support for millions of documents."
        }
      ]
    },
    {
      id: "search-architecture",
      title: "Search Architecture",
      content: `The search architecture is built on a distributed, fault-tolerant system with multiple layers of indexing and caching for optimal performance.

### Index Structure

#### Primary Index
- Main search index containing all searchable content
- Real-time updates with eventual consistency
- Partitioned by entity type for optimal performance
- Supports complex queries and aggregations

#### Secondary Indexes
- Specialized indexes for specific use cases
- Location-based indexing with geospatial support
- Time-series indexes for temporal queries
- Facet indexes for fast filtering

### Query Processing Pipeline

1. **Query Parsing**: Parse and validate search query
2. **Query Expansion**: Add synonyms, corrections, and expansions
3. **Index Selection**: Choose optimal indexes for query execution
4. **Query Execution**: Parallel execution across selected indexes
5. **Result Merging**: Combine and deduplicate results
6. **Ranking & Scoring**: Apply relevance scoring and personalization
7. **Filtering & Faceting**: Apply filters and generate facet counts
8. **Pagination**: Apply sorting and pagination
9. **Response Formatting**: Format results for API consumption

### Caching Strategy

#### Query Result Cache
- Cache frequently accessed query results
- TTL-based expiration with intelligent invalidation
- Distributed cache with Redis clustering

#### Index Cache
- Cache hot index segments in memory
- Warm-up strategies for frequently accessed data
- Adaptive cache sizing based on usage patterns

### Scalability Features

#### Horizontal Scaling
- Index sharding across multiple nodes
- Query distribution with load balancing
- Automatic rebalancing for optimal performance

#### Fault Tolerance
- Replica sets for high availability
- Automatic failover and recovery
- Data consistency guarantees

#### Monitoring & Alerting
- Real-time performance monitoring
- Automated scaling triggers
- Comprehensive logging and alerting`,
      codeExamples: [
        {
          id: "search-architecture-implementation",
          title: "Search Architecture Implementation",
          description: "Core search service implementation",
          language: "typescript",
          code: `class SearchService {
  async search(query: SearchQuery, options: SearchOptions = {}): Promise<SearchResult> {
    // 1. Parse and validate query
    const parsedQuery = await this.parseQuery(query);

    // 2. Apply query optimizations
    const optimizedQuery = await this.optimizeQuery(parsedQuery);

    // 3. Check cache first
    const cacheKey = this.generateCacheKey(optimizedQuery, options);
    const cachedResult = await this.checkCache(cacheKey);

    if (cachedResult && !options.skipCache) {
      return cachedResult;
    }

    // 4. Execute search across indexes
    const searchResults = await this.executeSearch(optimizedQuery, options);

    // 5. Apply personalization and ranking
    const rankedResults = await this.rankResults(searchResults, options.userId);

    // 6. Apply filters and generate facets
    const filteredResults = await this.applyFilters(rankedResults, options.filters);
    const facets = await this.generateFacets(filteredResults);

    // 7. Apply pagination
    const paginatedResults = this.paginateResults(filteredResults, options.pagination);

    // 8. Cache results
    const result = { results: paginatedResults, facets, total: filteredResults.length };
    await this.cacheResult(cacheKey, result, options.cacheTtl);

    // 9. Log search analytics
    await this.logSearchAnalytics(query, result, options);

    return result;
  }

  private async executeSearch(query: OptimizedQuery, options: SearchOptions): Promise<RawSearchResult[]> {
    const indexPromises = query.indexes.map(index =>
      this.searchIndex(index, query, options)
    );

    const indexResults = await Promise.all(indexPromises);
    return this.mergeResults(indexResults);
  }

  private async rankResults(results: RawSearchResult[], userId?: string): Promise<RankedResult[]> {
    const userProfile = userId ? await this.getUserProfile(userId) : null;

    return results.map(result => ({
      ...result,
      score: this.calculateRelevanceScore(result, userProfile)
    })).sort((a, b) => b.score - a.score);
  }
}`
        }
      ]
    },
    {
      id: "query-syntax",
      title: "Query Syntax & Operators",
      content: `CareerForge supports a rich query syntax with boolean operators, fuzzy matching, and advanced search features.

### Basic Query Syntax

#### Simple Keyword Search
\`\`\`
software engineer
\`\`\`

#### Phrase Search
\`\`\`
"senior software engineer"
\`\`\`

#### Boolean Operators
\`\`\`
software AND engineer
software OR engineer
software NOT contractor
(software OR developer) AND remote
\`\`\`

### Advanced Operators

#### Fuzzy Matching
\`\`\`
engineer~        // Fuzzy match with default distance
engineer~2       // Fuzzy match with distance 2
\`\`\`

#### Proximity Search
\`\`\`
"software engineer"~5    // Within 5 words of each other
\`\`\`

#### Wildcard Search
\`\`\`
soft*             // Matches software, soft, etc.
engi*er           // Matches engineer, enginer, etc.
\`\`\`

#### Regular Expressions
\`\`\`
/soft.*engineer/  // Regex pattern matching
\`\`\`

#### Field-Specific Search
\`\`\`
title:engineer
company:"Google Inc"
location:(San Francisco OR "New York")
salary:[80000 TO 120000]
posted:[2024-01-01 TO 2024-12-31]
\`\`\`

### Query Examples

#### Job Search Queries
\`\`\`javascript
// Simple job search
{
  "query": "software engineer",
  "filters": {
    "location": "San Francisco",
    "jobType": "full-time",
    "experienceLevel": "senior"
  }
}

// Advanced job search
{
  "query": "(javascript OR typescript) AND react AND (node OR express)",
  "filters": {
    "salary": { "min": 80000, "max": 150000 },
    "remote": true,
    "postedWithin": "30d"
  }
}

// Company search
{
  "query": "technology company",
  "filters": {
    "industry": "Technology",
    "companySize": "51-200",
    "location": "California"
  }
}
\`\`\`

### Query Validation

All queries are validated for:
- Syntax correctness
- Security (no injection attacks)
- Performance (query complexity limits)
- Rate limiting per user

#### Query Complexity Limits
- Maximum query length: 1000 characters
- Maximum boolean clauses: 10
- Maximum wildcard expansions: 100
- Query execution timeout: 30 seconds`,
      codeExamples: [
        {
          id: "query-parser",
          title: "Query Parser Implementation",
          description: "Parsing complex search queries with operators",
          language: "typescript",
          code: `class QueryParser {
  parse(queryString: string): ParsedQuery {
    const tokens = this.tokenize(queryString);
    const ast = this.buildAST(tokens);
    return this.optimizeAST(ast);
  }

  private tokenize(query: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    while (i < query.length) {
      const char = query[i];

      if (char === '(') {
        tokens.push({ type: 'LPAREN', value: '(' });
        i++;
      } else if (char === ')') {
        tokens.push({ type: 'RPAREN', value: ')' });
        i++;
      } else if (char === '"') {
        const endQuote = query.indexOf('"', i + 1);
        if (endQuote === -1) throw new Error('Unclosed quote');
        tokens.push({
          type: 'PHRASE',
          value: query.substring(i + 1, endQuote)
        });
        i = endQuote + 1;
      } else if (/\s/.test(char)) {
        i++; // Skip whitespace
      } else if (/[A-Za-z0-9]/.test(char)) {
        const start = i;
        while (i < query.length && /[A-Za-z0-9_*~]/.test(query[i])) i++;
        tokens.push({
          type: 'TERM',
          value: query.substring(start, i)
        });
      } else {
        // Handle operators
        const operator = this.getOperator(query, i);
        if (operator) {
          tokens.push({ type: 'OPERATOR', value: operator });
          i += operator.length;
        } else {
          throw new Error(\`Invalid character: \${char}\`);
        }
      }
    }

    return tokens;
  }

  private getOperator(query: string, index: number): string | null {
    const operators = ['AND', 'OR', 'NOT', 'TO'];
    for (const op of operators) {
      if (query.substring(index, index + op.length).toUpperCase() === op) {
        return op;
      }
    }
    return null;
  }

  private buildAST(tokens: Token[]): QueryNode {
    // Implementation of recursive descent parser
    // Builds abstract syntax tree from tokens
    return this.parseExpression(tokens, 0).node;
  }
}`
        }
      ]
    },
    {
      id: "filtering-options",
      title: "Filtering Options",
      content: `Comprehensive filtering capabilities across all searchable entities with support for complex filter combinations.

### Job Filters

#### Basic Filters
\`\`\`javascript
{
  "jobType": ["full-time", "part-time"],
  "workType": ["remote", "hybrid"],
  "experienceLevel": ["mid", "senior"],
  "status": "active"
}
\`\`\`

#### Location Filters
\`\`\`javascript
{
  "location": {
    "city": "San Francisco",
    "state": "CA",
    "country": "US",
    "radius": 50,  // km
    "coordinates": {
      "lat": 37.7749,
      "lng": -122.4194
    }
  }
}
\`\`\`

#### Salary Filters
\`\`\`javascript
{
  "salary": {
    "min": 80000,
    "max": 150000,
    "currency": "USD",
    "period": "yearly",
    "negotiable": true
  }
}
\`\`\`

#### Date Filters
\`\`\`javascript
{
  "postedWithin": "30d",  // 30 days, 1w, 1m, etc.
  "postedBetween": {
    "start": "2024-01-01",
    "end": "2024-12-31"
  }
}
\`\`\`

#### Company Filters
\`\`\`javascript
{
  "company": {
    "ids": ["company-uuid-1", "company-uuid-2"],
    "size": ["51-200", "201-1000"],
    "industry": ["Technology", "Finance"],
    "verified": true
  }
}
\`\`\`

### User/Candidate Filters

\`\`\`javascript
{
  "experience": {
    "years": { "min": 3, "max": 8 },
    "level": ["mid", "senior"]
  },
  "skills": ["javascript", "react", "nodejs"],
  "education": {
    "degree": ["Bachelor", "Master"],
    "field": ["Computer Science", "Software Engineering"]
  },
  "location": {
    "willingToRelocate": true,
    "remoteWork": true
  }
}
\`\`\`

### Application Filters

\`\`\`javascript
{
  "status": ["submitted", "under_review", "shortlisted"],
  "submittedWithin": "7d",
  "priority": ["high", "urgent"],
  "reviewer": "user-uuid",
  "tags": ["frontend", "experienced"]
}
\`\`\`

### Advanced Filtering

#### Range Filters
\`\`\`javascript
{
  "ranges": {
    "salary": { "gte": 50000, "lte": 100000 },
    "experience": { "gte": 2, "lte": 5 },
    "companySize": { "gte": 50, "lte": 500 }
  }
}
\`\`\`

#### Multi-Value Filters
\`\`\`javascript
{
  "multiValue": {
    "skills": {
      "values": ["javascript", "python", "java"],
      "operator": "OR"  // AND, OR, NOT
    },
    "locations": {
      "values": ["San Francisco", "New York", "Austin"],
      "operator": "OR"
    }
  }
}
\`\`\`

#### Dynamic Filters
\`\`\`javascript
{
  "dynamic": {
    "customField": {
      "field": "custom_questions.answer",
      "value": "yes",
      "type": "exact"
    }
  }
}
\`\`\`

### Filter Validation

All filters are validated for:
- Data type correctness
- Value range validation
- Security (no injection)
- Performance impact assessment

#### Filter Performance Optimization
- Automatic filter reordering for optimal execution
- Index selection based on filter combinations
- Query plan caching for repeated filter patterns`,
      lists: [
        {
          type: "unordered",
          items: [
            "Filters are combined with AND logic by default",
            "Empty filter values are ignored automatically",
            "Filter combinations are optimized for performance",
            "Complex filters may impact query performance"
          ]
        }
      ]
    },
    {
      id: "sorting-pagination",
      title: "Sorting & Pagination",
      content: `Flexible sorting options and efficient pagination for large result sets.

### Sorting Options

#### Default Sorting
- **Relevance**: BM25 scoring algorithm
- **Date**: Most recent first
- **Popularity**: Based on views/applications

#### Job Sorting
\`\`\`javascript
{
  "sort": {
    "field": "relevance",  // relevance, date, salary, company
    "order": "desc",       // asc, desc
    "secondary": {
      "field": "date",
      "order": "desc"
    }
  }
}
\`\`\`

#### Custom Sorting
\`\`\`javascript
{
  "sort": {
    "field": "salary",
    "order": "desc",
    "type": "numeric"
  }
}

// Multiple sort criteria
{
  "sort": [
    { "field": "relevance", "order": "desc" },
    { "field": "date", "order": "desc" },
    { "field": "company", "order": "asc" }
  ]
}
\`\`\`

### Pagination

#### Offset-Based Pagination
\`\`\`javascript
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "offset": 0
  }
}
\`\`\`

#### Cursor-Based Pagination
\`\`\`javascript
{
  "pagination": {
    "cursor": "eyJpZCI6ImpvYi0xMjMifQ==",  // Base64 encoded
    "limit": 20,
    "direction": "next"  // next, previous
  }
}
\`\`\`

#### Search-After Pagination
\`\`\`javascript
{
  "pagination": {
    "searchAfter": ["job-123", 0.85, "2024-01-15"],
    "limit": 20
  }
}
\`\`\`

### Pagination Metadata

\`\`\`json
{
  "results": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1250,
    "totalPages": 63,
    "hasNext": true,
    "hasPrevious": false,
    "nextCursor": "eyJpZCI6ImpvYi0yNDUifQ==",
    "prevCursor": null
  }
}
\`\`\`

### Performance Optimization

#### Result Window Limits
- Maximum page size: 100 items
- Maximum offset: 10,000 items
- Cursor validity: 24 hours

#### Caching Strategy
- Cache first page results for 5 minutes
- Cache pagination metadata for 1 hour
- Invalidate cache on data updates

#### Deep Pagination Handling
\`\`\`javascript
// Handle deep pagination efficiently
const getDeepPageResults = async (page, limit) => {
  const maxEfficientOffset = 10000;

  if (page * limit > maxEfficientOffset) {
    // Use cursor-based approach for deep pages
    return getCursorBasedResults(page, limit);
  } else {
    // Use offset-based for shallow pages
    return getOffsetBasedResults(page, limit);
  }
};
\`\`\``,
      codeExamples: [
        {
          id: "pagination-implementation",
          title: "Pagination Implementation",
          description: "Efficient pagination with multiple strategies",
          language: "typescript",
          code: `class PaginationService {
  async paginateResults(
    results: any[],
    pagination: PaginationOptions,
    total: number
  ): Promise<PaginatedResult> {
    const { type, page, limit, cursor } = pagination;

    switch (type) {
      case 'offset':
        return this.offsetPagination(results, page, limit, total);

      case 'cursor':
        return this.cursorPagination(results, cursor, limit);

      case 'searchAfter':
        return this.searchAfterPagination(results, cursor, limit);

      default:
        throw new Error(\`Unsupported pagination type: \${type}\`);
    }
  }

  private offsetPagination(results: any[], page: number, limit: number, total: number) {
    const offset = (page - 1) * limit;
    const paginatedResults = results.slice(offset, offset + limit);

    return {
      results: paginatedResults,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: offset + limit < total,
        hasPrevious: page > 1
      }
    };
  }

  private cursorPagination(results: any[], cursor: string, limit: number) {
    const decodedCursor = this.decodeCursor(cursor);
    const startIndex = this.findCursorIndex(results, decodedCursor);
    const paginatedResults = results.slice(startIndex, startIndex + limit);

    return {
      results: paginatedResults,
      pagination: {
        cursor: this.encodeCursor(paginatedResults[paginatedResults.length - 1]),
        limit,
        hasNext: startIndex + limit < results.length,
        hasPrevious: startIndex > 0
      }
    };
  }

  private searchAfterPagination(results: any[], searchAfter: any[], limit: number) {
    const startIndex = this.findSearchAfterIndex(results, searchAfter);
    const paginatedResults = results.slice(startIndex, startIndex + limit);

    return {
      results: paginatedResults,
      pagination: {
        searchAfter: this.getLastSortValues(paginatedResults),
        limit,
        hasNext: startIndex + limit < results.length
      }
    };
  }
}`
        }
      ]
    },
    {
      id: "search-optimization",
      title: "Search Optimization",
      content: `Advanced optimization techniques for fast, accurate, and relevant search results.

### Query Optimization

#### Query Rewriting
\`\`\`javascript
const optimizeQuery = (originalQuery) => {
  // 1. Spelling correction
  const correctedQuery = spellCheck(originalQuery);

  // 2. Synonym expansion
  const expandedQuery = expandSynonyms(correctedQuery);

  // 3. Query decomposition
  const decomposedQuery = decomposeComplexQuery(expandedQuery);

  // 4. Index selection
  const optimalIndexes = selectIndexes(decomposedQuery);

  return {
    original: originalQuery,
    optimized: decomposedQuery,
    indexes: optimalIndexes,
    corrections: getCorrections(originalQuery, correctedQuery)
  };
};
\`\`\`

#### Index Selection
\`\`\`javascript
const selectIndexes = (query) => {
  const indexes = [];

  // Primary full-text index
  if (query.hasText) {
    indexes.push('fulltext_primary');
  }

  // Field-specific indexes
  if (query.filters.location) {
    indexes.push('location_geo');
  }

  if (query.filters.salary) {
    indexes.push('salary_numeric');
  }

  if (query.filters.date) {
    indexes.push('date_time');
  }

  // Facet indexes
  if (query.needsFacets) {
    indexes.push('facets_aggregated');
  }

  return indexes;
};
\`\`\`

### Result Ranking

#### Relevance Scoring
\`\`\`javascript
const calculateRelevanceScore = (document, query, userContext) => {
  let score = 0;

  // BM25 text scoring
  score += bm25Score(document.content, query.text) * 0.4;

  // Field matching bonuses
  if (document.title.includes(query.text)) score += 0.2;
  if (document.tags.some(tag => query.text.includes(tag))) score += 0.1;

  // Recency bonus
  const daysSincePosted = (Date.now() - document.postedAt) / (1000 * 60 * 60 * 24);
  score += Math.max(0, 0.1 * (30 - daysSincePosted) / 30);

  // User personalization
  if (userContext) {
    score += calculatePersonalizationScore(document, userContext) * 0.1;
  }

  // Company reputation
  score += document.company.reputationScore * 0.05;

  return Math.min(score, 1.0); // Normalize to 0-1
};
\`\`\`

#### Personalization
\`\`\`javascript
const calculatePersonalizationScore = (document, userContext) => {
  let score = 0;

  // Location preference
  if (userContext.preferredLocations.includes(document.location)) {
    score += 0.3;
  }

  // Salary alignment
  const salaryMatch = calculateSalaryMatch(document.salary, userContext.expectedSalary);
  score += salaryMatch * 0.3;

  // Skills matching
  const skillsOverlap = calculateSkillsOverlap(document.requirements, userContext.skills);
  score += skillsOverlap * 0.4;

  return score;
};
\`\`\`

### Caching & Performance

#### Multi-Level Caching
\`\`\`javascript
class SearchCache {
  constructor() {
    this.l1Cache = new Map(); // In-memory L1
    this.l2Cache = new Redis(); // Redis L2
    this.l3Cache = new CloudCache(); // Cloud L3
  }

  async get(key) {
    // Check L1 first
    let result = this.l1Cache.get(key);
    if (result) return result;

    // Check L2
    result = await this.l2Cache.get(key);
    if (result) {
      this.l1Cache.set(key, result); // Warm L1
      return result;
    }

    // Check L3
    result = await this.l3Cache.get(key);
    if (result) {
      this.l2Cache.set(key, result); // Warm L2
      this.l1Cache.set(key, result); // Warm L1
      return result;
    }

    return null;
  }

  async set(key, value, ttl) {
    this.l1Cache.set(key, value);
    await this.l2Cache.set(key, value, ttl);
    await this.l3Cache.set(key, value, ttl);
  }
}
\`\`\`

#### Query Result Caching
\`\`\`javascript
const cacheKey = (query, filters, userId) => {
  const keyData = {
    query: query.toLowerCase().trim(),
    filters: sortObjectKeys(filters),
    userId: userId || 'anonymous'
  };

  return crypto.createHash('sha256')
    .update(JSON.stringify(keyData))
    .digest('hex');
};
\`\`\`

### Search Analytics

#### Query Performance Monitoring
\`\`\`javascript
const monitorQueryPerformance = (query, executionTime, resultCount) => {
  // Log to monitoring system
  metrics.timing('search.query.execution_time', executionTime);
  metrics.increment('search.query.count');
  metrics.histogram('search.results.count', resultCount);

  // Track slow queries
  if (executionTime > 1000) {
    logger.warn('Slow search query', {
      query,
      executionTime,
      resultCount
    });
  }

  // Track zero-result queries
  if (resultCount === 0) {
    analytics.track('search.zero_results', { query });
  }
};
\`\`\`

#### A/B Testing
\`\`\`javascript
const runSearchABTest = (query, userId, variant) => {
  const testKey = \`search_ranking_\${variant}\`;

  // Apply different ranking algorithm based on variant
  const results = variant === 'A'
    ? rankWithAlgorithmA(query)
    : rankWithAlgorithmB(query);

  // Track user interaction with results
  analytics.track(\`search.variant_\${variant}\`, {
    userId,
    query,
    resultCount: results.length,
    testKey
  });

  return results;
};
\`\`\``,
      calloutBoxes: [
        {
          type: "success",
          title: "Performance Benchmarks",
          content: "Search queries complete in under 100ms for 95% of requests, with advanced queries under 500ms."
        }
      ]
    },
    {
      id: "search-analytics",
      title: "Search Analytics",
      content: `Comprehensive analytics for search behavior, performance monitoring, and optimization insights.

### Search Metrics

#### Query Analytics
\`\`\`javascript
const trackSearchQuery = async (query, filters, results, userId) => {
  await analytics.track('search.query', {
    userId,
    query: query.original,
    correctedQuery: query.corrected,
    filters,
    resultCount: results.length,
    executionTime: results.executionTime,
    hasResults: results.length > 0,
    timestamp: new Date()
  });
};
\`\`\`

#### User Behavior Analytics
\`\`\`javascript
const trackSearchBehavior = async (userId, sessionId, actions) => {
  const behavior = {
    userId,
    sessionId,
    searches: actions.filter(a => a.type === 'search'),
    clicks: actions.filter(a => a.type === 'click'),
    conversions: actions.filter(a => a.type === 'apply'),
    sessionDuration: calculateSessionDuration(actions),
    bounceRate: calculateBounceRate(actions)
  };

  await analytics.track('search.behavior', behavior);
};
\`\`\`

### Performance Analytics

#### Response Time Analytics
\`\`\`javascript
const analyzeSearchPerformance = (metrics) => {
  const analysis = {
    averageResponseTime: calculateAverage(metrics.responseTimes),
    percentile95: calculatePercentile(metrics.responseTimes, 95),
    percentile99: calculatePercentile(metrics.responseTimes, 99),
    errorRate: metrics.errors / metrics.totalQueries,
    zeroResultRate: metrics.zeroResults / metrics.totalQueries,
    cacheHitRate: metrics.cacheHits / metrics.totalQueries
  };

  return analysis;
};
\`\`\`

#### Index Performance
\`\`\`javascript
const monitorIndexPerformance = () => {
  return {
    indexSize: getIndexSize(),
    queryRate: getQueriesPerSecond(),
    indexLatency: getAverageIndexLatency(),
    mergeRate: getIndexMergeRate(),
    diskUsage: getIndexDiskUsage(),
    memoryUsage: getIndexMemoryUsage()
  };
};
\`\`\`

### Conversion Analytics

#### Search to Action Funnel
\`\`\`javascript
const analyzeSearchFunnel = (searchId, userId) => {
  const funnel = {
    search: true,
    view: checkIfViewed(searchId, userId),
    click: checkIfClicked(searchId, userId),
    apply: checkIfApplied(searchId, userId),
    interview: checkIfInterviewed(searchId, userId),
    hire: checkIfHired(searchId, userId)
  };

  const conversionRate = calculateConversionRate(funnel);

  return {
    funnel,
    conversionRate,
    dropOffPoints: identifyDropOffPoints(funnel)
  };
};
\`\`\`

### Search Quality Metrics

#### Relevance Metrics
\`\`\`javascript
const calculateRelevanceMetrics = (query, results, userFeedback) => {
  return {
    averageRelevanceScore: calculateAverageRelevance(results),
    clickThroughRate: calculateCTR(results, userFeedback),
    userSatisfaction: calculateUserSatisfaction(userFeedback),
    resultDiversity: calculateResultDiversity(results),
    queryUnderstanding: assessQueryUnderstanding(query, results)
  };
};
\`\`\`

#### A/B Test Results
\`\`\`javascript
const analyzeABTestResults = (testId, variantA, variantB) => {
  const statsA = calculateSearchStats(variantA);
  const statsB = calculateSearchStats(variantB);

  const significance = calculateStatisticalSignificance(statsA, statsB);

  return {
    variantA: statsA,
    variantB: statsB,
    winner: statsA.ctr > statsB.ctr ? 'A' : 'B',
    significance,
    confidence: calculateConfidenceInterval(significance),
    recommendation: generateRecommendation(statsA, statsB)
  };
};
\`\`\`

### Reporting & Insights

#### Automated Reports
\`\`\`javascript
const generateSearchReport = async (dateRange, filters) => {
  const data = await collectSearchData(dateRange, filters);

  return {
    summary: {
      totalQueries: data.totalQueries,
      uniqueUsers: data.uniqueUsers,
      averageResults: data.averageResults,
      topQueries: data.topQueries.slice(0, 10)
    },
    performance: {
      responseTime: data.averageResponseTime,
      errorRate: data.errorRate,
      cacheHitRate: data.cacheHitRate
    },
    quality: {
      zeroResultRate: data.zeroResultRate,
      averageRelevance: data.averageRelevance,
      userSatisfaction: data.userSatisfaction
    },
    trends: {
      queryVolume: data.queryVolumeTrend,
      performance: data.performanceTrend,
      quality: data.qualityTrend
    }
  };
};
\`\`\`

#### Real-time Dashboards
\`\`\`javascript
const getRealtimeSearchMetrics = () => {
  return {
    currentQps: getCurrentQueriesPerSecond(),
    averageLatency: getCurrentAverageLatency(),
    errorRate: getCurrentErrorRate(),
    topQueries: getTopQueriesLastHour(),
    systemHealth: getSearchSystemHealth()
  };
};
\`\`\``,
      lists: [
        {
          type: "ordered",
          items: [
            "Analytics data is anonymized and aggregated for privacy",
            "Real-time metrics are available through monitoring dashboards",
            "Historical data is retained for trend analysis and optimization",
            "Automated alerts notify of performance degradation or quality issues"
          ]
        }
      ]
    },
    {
      id: "search-endpoints",
      title: "Search & Filtering Endpoints",
      content: `Complete API reference for search and filtering operations.

### Core Search Endpoints

#### POST /search
Universal search across all entities.

#### GET /search/jobs
Search jobs with advanced filtering.

#### GET /search/companies
Search companies with filtering.

#### GET /search/users
Search users/candidates.

#### GET /search/applications
Search applications (employer access).

### Search Parameters

#### Universal Search
\`\`\`javascript
POST /search
{
  "query": "software engineer",
  "entity": "jobs",  // jobs, companies, users, applications
  "filters": {
    "location": "San Francisco",
    "remote": true
  },
  "sort": {
    "field": "relevance",
    "order": "desc"
  },
  "pagination": {
    "page": 1,
    "limit": 20
  }
}
\`\`\`

#### Advanced Job Search
\`\`\`javascript
GET /search/jobs?query=engineer&location=San+Francisco&remote=true&page=1&limit=20
\`\`\`

### Filter Endpoints

#### GET /search/filters
Get available filter options.

#### GET /search/facets
Get facet counts for current search.

#### POST /search/saved
Save search query for later use.

#### GET /search/saved
Get saved searches.

### Analytics Endpoints

#### GET /search/analytics/queries
Get query analytics.

#### GET /search/analytics/performance
Get search performance metrics.

#### GET /search/analytics/quality
Get search quality metrics.

### Administrative Endpoints

#### POST /admin/search/reindex
Trigger search reindexing.

#### GET /admin/search/health
Get search system health.

#### POST /admin/search/optimize
Optimize search indexes.

### Response Examples

#### Search Response
\`\`\`json
{
  "success": true,
  "data": {
    "query": "software engineer",
    "results": [
      {
        "id": "job-123",
        "type": "job",
        "title": "Senior Software Engineer",
        "company": "Tech Corp",
        "location": "San Francisco, CA",
        "relevanceScore": 0.95,
        "highlights": {
          "title": "Senior <em>Software</em> <em>Engineer</em>",
          "description": "We are looking for a senior <em>software</em> <em>engineer</em>..."
        }
      }
    ],
    "facets": {
      "jobTypes": [
        { "value": "full-time", "count": 150 },
        { "value": "contract", "count": 45 }
      ],
      "locations": [
        { "value": "San Francisco", "count": 89 },
        { "value": "New York", "count": 67 }
      ]
    },
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 245,
      "totalPages": 13
    },
    "executionTime": 45
  }
}
\`\`\`

#### Filter Options Response
\`\`\`json
{
  "success": true,
  "data": {
    "jobTypes": ["full-time", "part-time", "contract", "freelance"],
    "experienceLevels": ["entry", "mid", "senior", "executive"],
    "workTypes": ["remote", "hybrid", "on-site"],
    "industries": ["Technology", "Finance", "Healthcare", "Education"],
    "companySizes": ["1-10", "11-50", "51-200", "201-1000", "1000+"],
    "salaryRanges": [
      { "min": 0, "max": 50000 },
      { "min": 50000, "max": 80000 },
      { "min": 80000, "max": 120000 }
    ]
  }
}
\`\`\`

#### Error Response
\`\`\`json
{
  "success": false,
  "error": {
    "code": "QUERY_TOO_COMPLEX",
    "message": "Search query is too complex",
    "details": {
      "maxClauses": 10,
      "actualClauses": 15
    }
  }
}
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "All search endpoints support both GET and POST methods",
            "Query parameters are URL-encoded for GET requests",
            "Search results include relevance highlighting",
            "Facet counts are calculated in real-time",
            "Saved searches are user-specific and private"
          ]
        }
      ]
    }
  ],
  nextSteps: {
    title: "Next Steps",
    links: [
      {
        text: "Job Management API",
        href: "/docs/backend-api/job-management",
        description: "Create and manage job postings with search integration"
      },
      {
        text: "Analytics API",
        href: "/docs/backend-api/analytics",
        description: "Track search performance and user behavior"
      },
      {
        text: "API Rate Limiting",
        href: "/docs/backend-api/rate-limiting",
        description: "Manage search API usage and limits"
      }
    ]
  },
  relatedResources: [
    {
      text: "Query Language Guide",
      href: "/docs/search/query-language",
      description: "Detailed query syntax and examples"
    },
    {
      text: "Search Best Practices",
      href: "/docs/search/best-practices",
      description: "Optimization tips and performance guidelines"
    },
    {
      text: "Search API SDK",
      href: "/docs/search/sdk",
      description: "Official SDKs for search integration"
    }
  ]
}