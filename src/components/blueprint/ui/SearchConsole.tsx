import React, { useState } from 'react';
import { SearchEngine } from '../../../core/knowledge/SearchEngine';
import { BlueprintOS } from '../../../core/blueprint/BlueprintOS';
import { GraphNode } from '../../../core/knowledge/KnowledgeGraph';

interface SearchConsoleProps {
  blueprintOS: BlueprintOS;
  onNodeSelect?: (nodeId: string) => void;
}

export const SearchConsole: React.FC<SearchConsoleProps> = ({
  blueprintOS,
  onNodeSelect,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GraphNode[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const searchEngine = blueprintOS.search;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim() === '') {
      setResults([]);
    } else {
      const res = searchEngine.execute(val);
      setResults(res.matches);
    }
  };

  const handleSelect = (node: GraphNode) => {
    let targetNodeId = node.id;
    if (node.type === 'subsystem') {
      const parentProjectEdge = blueprintOS.graph.getEdges(node.id).find(
        (edge) => edge.relation === 'part_of'
      );
      if (parentProjectEdge) {
        targetNodeId = parentProjectEdge.target;
      }
    }

    if (onNodeSelect) {
      onNodeSelect(targetNodeId);
    }
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative font-blueprint select-none w-full max-w-sm">
      <div className="relative flex items-center bg-blueprint-bg border border-blueprint-accent/35 rounded-sm p-1.5 focus-within:border-blueprint-accent focus-within:shadow-[0_0_8px_rgba(0,240,255,0.2)] transition-all">
        <span className="text-[10px] text-blueprint-accent/60 pl-1 pr-2 font-bold">
          [SYS.SEARCH] &gt;
        </span>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="SEARCH JWT, RASPI, PYTHON..."
          className="flex-1 bg-transparent text-blueprint-accent text-xs outline-none uppercase font-bold placeholder-blueprint-accent/35 w-full"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="text-[9px] hover:text-blueprint-accent text-blueprint-accent/40 px-1"
          >
            [CLEAR]
          </button>
        )}
      </div>

      {isFocused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-blueprint-bg border border-blueprint-accent rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.6)] z-50 max-h-[220px] overflow-y-auto scrollbar-thin">
          <div className="text-[8px] bg-blueprint-accent/10 border-b border-blueprint-accent/15 px-2.5 py-1 text-blueprint-accent/60 font-bold uppercase tracking-widest">
            FOUND_{results.length}_CORRELATIONS
          </div>
          <div className="divide-y divide-blueprint-accent/10">
            {results.map((node) => (
              <div
                key={node.id}
                onClick={() => handleSelect(node)}
                className="px-2.5 py-1.5 hover:bg-blueprint-accent/5 cursor-pointer flex justify-between items-center transition-colors group text-left"
              >
                <div>
                  <span className="text-[10px] font-bold text-blueprint-accent group-hover:text-white">
                    {node.label}
                  </span>
                  {node.type === 'technology' && (
                    <span className="text-[7px] text-blueprint-accent/55 block capitalize font-bold font-mono">
                      Category: {node.data.category}
                    </span>
                  )}
                  {node.type === 'project' && (
                    <span className="text-[7px] text-blueprint-accent/55 block font-bold font-mono">
                      Version: {node.data.activeVersion}
                    </span>
                  )}
                  {node.type === 'subsystem' && (
                    <span className="text-[7px] text-blueprint-accent/55 block font-bold font-mono truncate max-w-[240px]">
                      Func: {node.data.function}
                    </span>
                  )}
                </div>
                <span className="text-[8px] px-1 py-0.2 bg-blueprint-accent/5 border border-blueprint-accent/15 text-blueprint-accent font-bold uppercase rounded-sm">
                  {node.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
