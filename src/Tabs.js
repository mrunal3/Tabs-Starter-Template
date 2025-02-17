import { useState, useEffect, useRef } from "react";

export default function Tabs() {
  const tabs = [
    {
      id: "html",
      label: "HTML",
      content:
        "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    },
    {
      id: "css",
      label: "CSS",
      content:
        "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    },
    {
      id: "javascript",
      label: "JavaScript",
      content:
        "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
    },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const tabRefs = useRef([]);
  const handleTabSelect = (tabId) => {
    setSelectedTab(tabId);
  };

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === selectedTab);
    if (tabRefs.current[activeIndex]) {
      tabRefs.current[activeIndex].focus();
    }
  }, [selectedTab]);

  const handleKeyDown = (event) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === selectedTab);

    if (event.key === "ArrowRight") {
      const nextIndex = (currentIndex + 1) % tabs.length;
      setSelectedTab(tabs[nextIndex].id);
    } else if (event.key === "ArrowLeft") {
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setSelectedTab(tabs[prevIndex].id);
    } else if (event.key === "Home") {
      setSelectedTab(tabs[0].id);
    } else if (event.key === "End") {
      setSelectedTab(tabs[tabs.length - 1].id);
    }
  };

  return (
    <div>
      {/* Tab List */}
      <div
        role="tablist"
        aria-label="Programming Languages"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            ref={(el) => (tabRefs.current[index] = el)} // Store ref
            aria-selected={selectedTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={selectedTab === tab.id ? 0 : -1}
            className={`tab ${selectedTab === tab.id ? "tab-active" : ""}`}
            onClick={() => handleTabSelect(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={selectedTab !== tab.id}
          className={`tab-container ${
            selectedTab === tab.id ? "tab-container-active" : ""
          }`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
