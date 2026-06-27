import sys
import asyncio

if sys.platform == 'win32':
    # On Windows, psycopg's async connection pool requires the Selector event loop.
    # We set the policy globally here so that pytest-asyncio creates SelectorEventLoop instances.
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
