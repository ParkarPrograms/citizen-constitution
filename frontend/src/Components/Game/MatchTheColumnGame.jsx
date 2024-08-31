import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function MatchTheFollowingGame({ gameId, onQuit }) {
  const [items, setItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);

  useEffect(() => {
    // Fetch or define items based on gameId
    const initialItems = [
      { id: '1', left: "Item A", right: "Match 1" },
      { id: '2', left: "Item B", right: "Match 2" },
      // More items
    ];
    setItems(initialItems);
    setMatchedItems(initialItems.map(item => ({ ...item, right: item.right })));
  }, [gameId]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Rearranging items only within the right column
    if (source.droppableId === 'rightColumn' && destination.droppableId === 'rightColumn') {
      const updatedMatchedItems = Array.from(matchedItems);
      const [movedItem] = updatedMatchedItems.splice(source.index, 1);
      updatedMatchedItems.splice(destination.index, 0, movedItem);
      setMatchedItems(updatedMatchedItems);
    }
  };

  const checkResults = () => {
    const score = matchedItems.filter((item, index) => item.right === items[index].right).length;
    alert(`Game Over! Your final score is ${score} / ${matchedItems.length}`);
    onQuit();
  };

  return (
    <div>
      <h1>Match the Following</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '8px',
                  marginBottom: '8px',
                  backgroundColor: '#f4f4f4',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                {item.left}
              </div>
            ))}
          </div>

          <Droppable droppableId="rightColumn">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ width: '45%' }}
              >
                {matchedItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          padding: '8px',
                          marginBottom: '8px',
                          backgroundColor: '#f4f4f4',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                      >
                        {item.right}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <button onClick={checkResults}>Submit</button>
      <button onClick={onQuit}>Quit</button>
    </div>
  );
}

export default MatchTheFollowingGame;
