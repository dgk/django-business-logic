/// <reference path="../goog_d_ts/all.d.ts" />

// Type definitions for blockly
// Project: https://developers.google.com/blockly/
// Definitions by: Troy McKinnon <https://github.com/trodi>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module Blockly {

  class Block extends Block__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Block__Class  {

    /**
     * Class for one block.
     * Not normally called directly, workspace.newBlock() is preferred.
     * @param {!Blockly.Workspace} workspace The block's workspace.
     * @param {?string} prototypeName Name of the language object containing
     *     type-specific functions for this block.
     * @param {string=} opt_id Optional ID.  Use this ID if provided, otherwise
     *     create a new id.
     * @constructor
     */
    constructor(workspace: Blockly.Workspace, prototypeName: string, opt_id?: string);

    /** @type {string} */
    id: string;

    /** @type {Blockly.Connection} */
    outputConnection: Blockly.Connection;

    /** @type {Blockly.Connection} */
    nextConnection: Blockly.Connection;

    /** @type {Blockly.Connection} */
    previousConnection: Blockly.Connection;

    /** @type {!Array.<!Blockly.Input>} */
    inputList: Blockly.Input[];

    /** @type {boolean|undefined} */
    inputsInline: boolean|any /*undefined*/;

    /** @type {boolean} */
    disabled: boolean;

    /** @type {string|!Function} */
    tooltip: string|Function;

    /** @type {boolean} */
    contextMenu: boolean;

    init: Function;

    /**
     * @type {Blockly.Block}
     * @private
     */
    parentBlock_: Blockly.Block;

    /**
     * @type {!Array.<!Blockly.Block>}
     * @private
     */
    childBlocks_: Blockly.Block[];

    /**
     * @type {boolean}
     * @private
     */
    deletable_: boolean;

    /**
     * @type {boolean}
     * @private
     */
    movable_: boolean;

    /**
     * @type {boolean}
     * @private
     */
    editable_: boolean;

    /**
     * @type {boolean}
     * @private
     */
    isShadow_: boolean;

    /**
     * @type {boolean}
     * @private
     */
    collapsed_: boolean;

    /** @type {string|Blockly.Comment} */
    comment: string|Blockly.Comment;

    /**
     * @type {!goog.math.Coordinate}
     * @private
     */
    xy_: goog.math.Coordinate;

    /** @type {!Blockly.Workspace} */
    workspace: Blockly.Workspace;

    /** @type {boolean} */
    isInFlyout: boolean;

    /** @type {boolean} */
    isInMutator: boolean;

    /** @type {boolean} */
    RTL: boolean;

    /** @type {string} */
    type: string;

    /** @type {boolean|undefined} */
    inputsInlineDefault: boolean|any /*undefined*/;

    /**
     * Optional text data that round-trips beween blocks and XML.
     * Has no effect. May be used by 3rd parties for meta information.
     * @type {?string}
     */
    data: string;

    /**
     * Colour of the block in '#RRGGBB' format.
     * @type {string}
     * @private
     */
    colour_: string;

    /**
     * Dispose of this block.
     * @param {boolean} healStack If true, then try to heal any gap by connecting
     *     the next statement with the previous statement.  Otherwise, dispose of
     *     all children of this block.
     */
    dispose(healStack: boolean): void;

    /**
     * Unplug this block from its superior block.  If this block is a statement,
     * optionally reconnect the block underneath with the block on top.
     * @param {boolean} opt_healStack Disconnect child statement and reconnect
     *   stack.  Defaults to false.
     */
    unplug(opt_healStack: boolean): void;

    /**
     * Returns all connections originating from this block.
     * @return {!Array.<!Blockly.Connection>} Array of connections.
     * @private
     */
    getConnections_(): Blockly.Connection[];

    /**
     * Walks down a stack of blocks and finds the last next connection on the stack.
     * @return {Blockly.Connection} The last next connection on the stack, or null.
     * @private
     */
    lastConnectionInStack_(): Blockly.Connection;

    /**
     * Bump unconnected blocks out of alignment.  Two blocks which aren't actually
     * connected should not coincidentally line up on screen.
     * @private
     */
    bumpNeighbours_(): void;

    /**
     * Return the parent block or null if this block is at the top level.
     * @return {Blockly.Block} The block that holds the current block.
     */
    getParent(): Blockly.Block;

    /**
     * Return the input that connects to the specified block.
     * @param {!Blockly.Block} block A block connected to an input on this block.
     * @return {Blockly.Input} The input that connects to the specified block.
     */
    getInputWithBlock(block: Blockly.Block): Blockly.Input;

    /**
     * Return the parent block that surrounds the current block, or null if this
     * block has no surrounding block.  A parent block might just be the previous
     * statement, whereas the surrounding block is an if statement, while loop, etc.
     * @return {Blockly.Block} The block that surrounds the current block.
     */
    getSurroundParent(): Blockly.Block;

    /**
     * Return the next statement block directly connected to this block.
     * @return {Blockly.Block} The next statement block or null.
     */
    getNextBlock(): Blockly.Block;

    /**
     * Return the top-most block in this block's tree.
     * This will return itself if this block is at the top level.
     * @return {!Blockly.Block} The root block.
     */
    getRootBlock(): Blockly.Block;

    /**
     * Find all the blocks that are directly nested inside this one.
     * Includes value and block inputs, as well as any following statement.
     * Excludes any connection on an output tab or any preceding statement.
     * @return {!Array.<!Blockly.Block>} Array of blocks.
     */
    getChildren(): Blockly.Block[];

    /**
     * Set parent of this block to be a new block or null.
     * @param {Blockly.Block} newParent New parent block.
     */
    setParent(newParent: Blockly.Block): void;

    /**
     * Find all the blocks that are directly or indirectly nested inside this one.
     * Includes this block in the list.
     * Includes value and block inputs, as well as any following statements.
     * Excludes any connection on an output tab or any preceding statements.
     * @return {!Array.<!Blockly.Block>} Flattened array of blocks.
     */
    getDescendants(): Blockly.Block[];

    /**
     * Get whether this block is deletable or not.
     * @return {boolean} True if deletable.
     */
    isDeletable(): boolean;

    /**
     * Set whether this block is deletable or not.
     * @param {boolean} deletable True if deletable.
     */
    setDeletable(deletable: boolean): void;

    /**
     * Get whether this block is movable or not.
     * @return {boolean} True if movable.
     */
    isMovable(): boolean;

    /**
     * Set whether this block is movable or not.
     * @param {boolean} movable True if movable.
     */
    setMovable(movable: boolean): void;

    /**
     * Get whether this block is a shadow block or not.
     * @return {boolean} True if a shadow.
     */
    isShadow(): boolean;

    /**
     * Set whether this block is a shadow block or not.
     * @param {boolean} shadow True if a shadow.
     */
    setShadow(shadow: boolean): void;

    /**
     * Get whether this block is editable or not.
     * @return {boolean} True if editable.
     */
    isEditable(): boolean;

    /**
     * Set whether this block is editable or not.
     * @param {boolean} editable True if editable.
     */
    setEditable(editable: boolean): void;

    /**
     * Set whether the connections are hidden (not tracked in a database) or not.
     * Recursively walk down all child blocks (except collapsed blocks).
     * @param {boolean} hidden True if connections are hidden.
     */
    setConnectionsHidden(hidden: boolean): void;

    /**
     * Set the URL of this block's help page.
     * @param {string|Function} url URL string for block help, or function that
     *     returns a URL.  Null for no help.
     */
    setHelpUrl(url: string|Function): void;

    /**
     * Change the tooltip text for a block.
     * @param {string|!Function} newTip Text for tooltip or a parent element to
     *     link to for its tooltip.  May be a function that returns a string.
     */
    setTooltip(newTip: string|Function): void;

    /**
     * Get the colour of a block.
     * @return {string} #RRGGBB string.
     */
    getColour(): string;

    /**
     * Change the colour of a block.
     * @param {number|string} colour HSV hue value, or #RRGGBB string.
     */
    setColour(colour: number|string): void;

    /**
     * Returns the named field from a block.
     * @param {string} name The name of the field.
     * @return {Blockly.Field} Named field, or null if field does not exist.
     */
    getField(name: string): Blockly.Field;

    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     */
    getVars(): string[];

    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     */
    renameVar(oldName: string, newName: string): void;

    /**
     * Returns the language-neutral value from the field of a block.
     * @param {string} name The name of the field.
     * @return {?string} Value from the field or null if field does not exist.
     */
    getFieldValue(name: string): string;

    /**
     * Returns the language-neutral value from the field of a block.
     * @param {string} name The name of the field.
     * @return {?string} Value from the field or null if field does not exist.
     * @deprecated December 2013
     */
    getTitleValue(name: string): string;

    /**
     * Change the field value for a block (e.g. 'CHOOSE' or 'REMOVE').
     * @param {string} newValue Value to be the new field.
     * @param {string} name The name of the field.
     */
    setFieldValue(newValue: string, name: string): void;

    /**
     * Change the field value for a block (e.g. 'CHOOSE' or 'REMOVE').
     * @param {string} newValue Value to be the new field.
     * @param {string} name The name of the field.
     * @deprecated December 2013
     */
    setTitleValue(newValue: string, name: string): void;

    /**
     * Set whether this block can chain onto the bottom of another block.
     * @param {boolean} newBoolean True if there can be a previous statement.
     * @param {string|Array.<string>|null|undefined} opt_check Statement type or
     *     list of statement types.  Null/undefined if any type could be connected.
     */
    setPreviousStatement(newBoolean: boolean, opt_check: string|string[]|any /*null*/|any /*undefined*/): void;

    /**
     * Set whether another block can chain onto the bottom of this block.
     * @param {boolean} newBoolean True if there can be a next statement.
     * @param {string|Array.<string>|null|undefined} opt_check Statement type or
     *     list of statement types.  Null/undefined if any type could be connected.
     */
    setNextStatement(newBoolean: boolean, opt_check: string|string[]|any /*null*/|any /*undefined*/): void;

    /**
     * Set whether this block returns a value.
     * @param {boolean} newBoolean True if there is an output.
     * @param {string|Array.<string>|null|undefined} opt_check Returned type or list
     *     of returned types.  Null or undefined if any type could be returned
     *     (e.g. variable get).
     */
    setOutput(newBoolean: boolean, opt_check: string|string[]|any /*null*/|any /*undefined*/): void;

    /**
     * Set whether value inputs are arranged horizontally or vertically.
     * @param {boolean} newBoolean True if inputs are horizontal.
     */
    setInputsInline(newBoolean: boolean): void;

    /**
     * Get whether value inputs are arranged horizontally or vertically.
     * @return {boolean} True if inputs are horizontal.
     */
    getInputsInline(): boolean;

    /**
     * Set whether the block is disabled or not.
     * @param {boolean} disabled True if disabled.
     */
    setDisabled(disabled: boolean): void;

    /**
     * Get whether the block is disabled or not due to parents.
     * The block's own disabled property is not considered.
     * @return {boolean} True if disabled.
     */
    getInheritedDisabled(): boolean;

    /**
     * Get whether the block is collapsed or not.
     * @return {boolean} True if collapsed.
     */
    isCollapsed(): boolean;

    /**
     * Set whether the block is collapsed or not.
     * @param {boolean} collapsed True if collapsed.
     */
    setCollapsed(collapsed: boolean): void;

    /**
     * Create a human-readable text representation of this block and any children.
     * @param {number=} opt_maxLength Truncate the string to this length.
     * @param {string=} opt_emptyToken The placeholder string used to denote an
     *     empty field. If not specified, '?' is used.
     * @return {string} Text of block.
     */
    toString(opt_maxLength?: number, opt_emptyToken?: string): string;

    /**
     * Shortcut for appending a value input row.
     * @param {string} name Language-neutral identifier which may used to find this
     *     input again.  Should be unique to this block.
     * @return {!Blockly.Input} The input object created.
     */
    appendValueInput(name: string): Blockly.Input;

    /**
     * Shortcut for appending a statement input row.
     * @param {string} name Language-neutral identifier which may used to find this
     *     input again.  Should be unique to this block.
     * @return {!Blockly.Input} The input object created.
     */
    appendStatementInput(name: string): Blockly.Input;

    /**
     * Shortcut for appending a dummy input row.
     * @param {string=} opt_name Language-neutral identifier which may used to find
     *     this input again.  Should be unique to this block.
     * @return {!Blockly.Input} The input object created.
     */
    appendDummyInput(opt_name?: string): Blockly.Input;

    /**
     * Initialize this block using a cross-platform, internationalization-friendly
     * JSON description.
     * @param {!Object} json Structured data describing the block.
     */
    jsonInit(json: Object): void;

    /**
     * Interpolate a message description onto the block.
     * @param {string} message Text contains interpolation tokens (%1, %2, ...)
     *     that match with fields or inputs defined in the args array.
     * @param {!Array} args Array of arguments to be interpolated.
     * @param {string=} lastDummyAlign If a dummy input is added at the end,
     *     how should it be aligned?
     * @private
     */
    interpolate_(message: string, args: any[], lastDummyAlign?: string): void;

    /**
     * Add a value input, statement input or local variable to this block.
     * @param {number} type Either Blockly.INPUT_VALUE or Blockly.NEXT_STATEMENT or
     *     Blockly.DUMMY_INPUT.
     * @param {string} name Language-neutral identifier which may used to find this
     *     input again.  Should be unique to this block.
     * @return {!Blockly.Input} The input object created.
     * @private
     */
    appendInput_(type: number, name: string): Blockly.Input;

    /**
     * Move a named input to a different location on this block.
     * @param {string} name The name of the input to move.
     * @param {?string} refName Name of input that should be after the moved input,
     *   or null to be the input at the end.
     */
    moveInputBefore(name: string, refName: string): void;

    /**
     * Move a numbered input to a different location on this block.
     * @param {number} inputIndex Index of the input to move.
     * @param {number} refIndex Index of input that should be after the moved input.
     */
    moveNumberedInputBefore(inputIndex: number, refIndex: number): void;

    /**
     * Remove an input from this block.
     * @param {string} name The name of the input.
     * @param {boolean=} opt_quiet True to prevent error if input is not present.
     * @throws {goog.asserts.AssertionError} if the input is not present and
     *     opt_quiet is not true.
     */
    removeInput(name: string, opt_quiet?: boolean): void;

    /**
     * Fetches the named input object.
     * @param {string} name The name of the input.
     * @return {Blockly.Input} The input object, or null if input does not exist.
     */
    getInput(name: string): Blockly.Input;

    /**
     * Fetches the block attached to the named input.
     * @param {string} name The name of the input.
     * @return {Blockly.Block} The attached value block, or null if the input is
     *     either disconnected or if the input does not exist.
     */
    getInputTargetBlock(name: string): Blockly.Block;

    /**
     * Returns the comment on this block (or '' if none).
     * @return {string} Block's comment.
     */
    getCommentText(): string;

    /**
     * Set this block's comment text.
     * @param {?string} text The text, or null to delete.
     */
    setCommentText(text: string): void;

    /**
     * Set this block's warning text.
     * @param {?string} text The text, or null to delete.
     */
    setWarningText(text: string): void;

    /**
     * Give this block a mutator dialog.
     * @param {Blockly.Mutator} mutator A mutator dialog instance or null to remove.
     */
    setMutator(mutator: Blockly.Mutator): void;

    /**
     * Return the coordinates of the top-left corner of this block relative to the
     * drawing surface's origin (0,0).
     * @return {!goog.math.Coordinate} Object with .x and .y properties.
     */
    getRelativeToSurfaceXY(): goog.math.Coordinate;

    /**
     * Move a block by a relative offset.
     * @param {number} dx Horizontal offset.
     * @param {number} dy Vertical offset.
     */
    moveBy(dx: number, dy: number): void;

    /**
     * Create a connection of the specified type.
     * @param {number} type The type of the connection to create.
     * @return {!Blockly.Connection} A new connection of the specified type.
     * @private
     */
    makeConnection_(type: number): Blockly.Connection;
  }

}
declare module Blockly {

  /**
   * The main workspace most recently used.
   * Set by Blockly.WorkspaceSvg.prototype.markFocused
   * @type {Blockly.Workspace}
   */
  var mainWorkspace: Blockly.Workspace;

  /**
   * Currently selected block.
   * @type {Blockly.Block}
   */
  var selected: Blockly.Block;

  /**
   * Currently highlighted connection (during a drag).
   * @type {Blockly.Connection}
   * @private
   */
  var highlightedConnection_: Blockly.Connection;

  /**
   * Connection on dragged block that matches the highlighted connection.
   * @type {Blockly.Connection}
   * @private
   */
  var localConnection_: Blockly.Connection;

  /**
   * All of the connections on blocks that are currently being dragged.
   * @type {!Array.<!Blockly.Connection>}
   * @private
   */
  var draggingConnections_: Blockly.Connection[];

  /**
   * Contents of the local clipboard.
   * @type {Element}
   * @private
   */
  var clipboardXml_: Element;

  /**
   * Source of the local clipboard.
   * @type {Blockly.WorkspaceSvg}
   * @private
   */
  var clipboardSource_: Blockly.WorkspaceSvg;

  /**
   * Is the mouse dragging a block?
   * DRAG_NONE - No drag operation.
   * DRAG_STICKY - Still inside the sticky DRAG_RADIUS.
   * DRAG_FREE - Freely draggable.
   * @private
   */
  var dragMode_: any /*missing*/;

  /**
   * Convert a hue (HSV model) into an RGB hex triplet.
   * @param {number} hue Hue on a colour wheel (0-360).
   * @return {string} RGB code, e.g. '#5ba65b'.
   */
  function hueToRgb(hue: number): string;

  /**
   * Returns the dimensions of the specified SVG image.
   * @param {!Element} svg SVG image.
   * @return {!Object} Contains width and height properties.
   */
  function svgSize(svg: Element): Object;

  /**
   * Size the workspace when the contents change.  This also updates
   * scrollbars accordingly.
   * @param {!Blockly.WorkspaceSvg} workspace The workspace to resize.
   */
  function resizeSvgContents(workspace: Blockly.WorkspaceSvg): void;

  /**
   * Size the SVG image to completely fill its container. Call this when the view
   * actually changes sizes (e.g. on a window resize/device orientation change).
   * See Blockly.resizeSvgContents to resize the workspace when the contents
   * change (e.g. when a block is added or removed).
   * Record the height/width of the SVG image.
   * @param {!Blockly.WorkspaceSvg} workspace Any workspace in the SVG.
   */
  function svgResize(workspace: Blockly.WorkspaceSvg): void;

  /**
   * Handle a key-down on SVG drawing surface.
   * @param {!Event} e Key down event.
   * @private
   */
  function onKeyDown_(e: Event): void;

  /**
   * Stop binding to the global mouseup and mousemove events.
   * @private
   */
  function terminateDrag_(): void;

  /**
   * Copy a block onto the local clipboard.
   * @param {!Blockly.Block} block Block to be copied.
   * @private
   */
  function copy_(block: Blockly.Block): void;

  /**
   * Duplicate this block and its children.
   * @param {!Blockly.Block} block Block to be copied.
   * @private
   */
  function duplicate_(block: Blockly.Block): void;

  /**
   * Cancel the native context menu, unless the focus is on an HTML input widget.
   * @param {!Event} e Mouse down event.
   * @private
   */
  function onContextMenu_(e: Event): void;

  /**
   * Close tooltips, context menus, dropdown selections, etc.
   * @param {boolean=} opt_allowToolbox If true, don't close the toolbox.
   */
  function hideChaff(opt_allowToolbox?: boolean): void;

  /**
   * When something in Blockly's workspace changes, call a function.
   * @param {!Function} func Function to call.
   * @return {!Array.<!Array>} Opaque data that can be passed to
   *     removeChangeListener.
   * @deprecated April 2015
   */
  function addChangeListener(func: Function): any[][];

  /**
   * Returns the main workspace.  Returns the last used main workspace (based on
   * focus).  Try not to use this function, particularly if there are multiple
   * Blockly instances on a page.
   * @return {!Blockly.Workspace} The main workspace.
   */
  function getMainWorkspace(): Blockly.Workspace;
}
declare module Blockly {

  class BlockSvg extends BlockSvg__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class BlockSvg__Class extends Blockly.Block__Class  {

    /**
     * Class for a block's SVG representation.
     * Not normally called directly, workspace.newBlock() is preferred.
     * @param {!Blockly.Workspace} workspace The block's workspace.
     * @param {?string} prototypeName Name of the language object containing
     *     type-specific functions for this block.
     * @param {string=} opt_id Optional ID.  Use this ID if provided, otherwise
     *     create a new id.
     * @extends {Blockly.Block}
     * @constructor
     */
    constructor(workspace: Blockly.Workspace, prototypeName: string, opt_id?: string);

    /**
     * @type {SVGElement}
     * @private
     */
    svgGroup_: SVGElement;

    /**
     * @type {SVGElement}
     * @private
     */
    svgPathDark_: SVGElement;

    /**
     * @type {SVGElement}
     * @private
     */
    svgPath_: SVGElement;

    /**
     * @type {SVGElement}
     * @private
     */
    svgPathLight_: SVGElement;

    /** @type {boolean} */
    rendered: boolean;

    /**
     * Height of this block, not including any statement blocks above or below.
     */
    height: any /*missing*/;

    /**
     * Width of this block, including any connected value blocks.
     */
    width: any /*missing*/;

    /**
     * Original location of block being dragged.
     * @type {goog.math.Coordinate}
     * @private
     */
    dragStartXY_: goog.math.Coordinate;

    /**
     * Create and initialize the SVG representation of the block.
     * May be called more than once.
     */
    initSvg(): void;

    /**
     * Select this block.  Highlight it visually.
     */
    select(): void;

    /**
     * Unselect this block.  Remove its highlighting.
     */
    unselect(): void;

    /**
     * Block's mutator icon (if any).
     * @type {Blockly.Mutator}
     */
    mutator: Blockly.Mutator;

    /**
     * Block's comment icon (if any).
     * @type {Blockly.Comment}
     */
    comment: Blockly.Comment;

    /**
     * Block's warning icon (if any).
     * @type {Blockly.Warning}
     */
    warning: Blockly.Warning;

    /**
     * Returns a list of mutator, comment, and warning icons.
     * @return {!Array} List of icons.
     */
    getIcons(): any[];

    /**
     * Set parent of this block to be a new block or null.
     * @param {Blockly.BlockSvg} newParent New parent block.
     */
    setParent(newParent: Blockly.BlockSvg): void;

    /**
     * Return the coordinates of the top-left corner of this block relative to the
     * drawing surface's origin (0,0).
     * @return {!goog.math.Coordinate} Object with .x and .y properties.
     */
    getRelativeToSurfaceXY(): goog.math.Coordinate;

    /**
     * Move a block by a relative offset.
     * @param {number} dx Horizontal offset.
     * @param {number} dy Vertical offset.
     */
    moveBy(dx: number, dy: number): void;

    /**
     * Snap this block to the nearest grid point.
     */
    snapToGrid(): void;

    /**
     * Returns a bounding box describing the dimensions of this block
     * and any blocks stacked below it.
     * @return {!{height: number, width: number}} Object with height and width
     *    properties.
     */
    getHeightWidth(): { height: number; width: number };

    /**
     * Returns the coordinates of a bounding box describing the dimensions of this
     * block and any blocks stacked below it.
     * @return {!{topLeft: goog.math.Coordinate, bottomRight: goog.math.Coordinate}}
     *    Object with top left and bottom right coordinates of the bounding box.
     */
    getBoundingRectangle(): { topLeft: goog.math.Coordinate; bottomRight: goog.math.Coordinate };

    /**
     * Set whether the block is collapsed or not.
     * @param {boolean} collapsed True if collapsed.
     */
    setCollapsed(collapsed: boolean): void;

    /**
     * Open the next (or previous) FieldTextInput.
     * @param {Blockly.Field|Blockly.Block} start Current location.
     * @param {boolean} forward If true go forward, otherwise backward.
     */
    tab(start: Blockly.Field|Blockly.Block, forward: boolean): void;

    /**
     * Handle a mouse-down on an SVG block.
     * @param {!Event} e Mouse down event or touch start event.
     * @private
     */
    onMouseDown_(e: Event): void;

    /**
     * Handle a mouse-up anywhere in the SVG pane.  Is only registered when a
     * block is clicked.  We can't use mouseUp on the block since a fast-moving
     * cursor can briefly escape the block before it catches up.
     * @param {!Event} e Mouse up event.
     * @private
     */
    onMouseUp_(e: Event): void;

    /**
     * Load the block's help page in a new window.
     * @private
     */
    showHelp_(): void;

    /**
     * Show the context menu for this block.
     * @param {!Event} e Mouse event.
     * @private
     */
    showContextMenu_(e: Event): void;

    /**
     * Move the connections for this block and all blocks attached under it.
     * Also update any attached bubbles.
     * @param {number} dx Horizontal offset from current location.
     * @param {number} dy Vertical offset from current location.
     * @private
     */
    moveConnections_(dx: number, dy: number): void;

    /**
     * Recursively adds or removes the dragging class to this node and its children.
     * @param {boolean} adding True if adding, false if removing.
     * @private
     */
    setDragging_(adding: boolean): void;

    /**
     * Drag this block to follow the mouse.
     * @param {!Event} e Mouse move event.
     * @private
     */
    onMouseMove_(e: Event): void;

    /**
     * Add or remove the UI indicating if this block is movable or not.
     */
    updateMovable(): void;

    /**
     * Set whether this block is movable or not.
     * @param {boolean} movable True if movable.
     */
    setMovable(movable: boolean): void;

    /**
     * Set whether this block is editable or not.
     * @param {boolean} editable True if editable.
     */
    setEditable(editable: boolean): void;

    /**
     * Set whether this block is a shadow block or not.
     * @param {boolean} shadow True if a shadow.
     */
    setShadow(shadow: boolean): void;

    /**
     * Return the root node of the SVG or null if none exists.
     * @return {Element} The root SVG node (probably a group).
     */
    getSvgRoot(): Element;

    /**
     * Dispose of this block.
     * @param {boolean} healStack If true, then try to heal any gap by connecting
     *     the next statement with the previous statement.  Otherwise, dispose of
     *     all children of this block.
     * @param {boolean} animate If true, show a disposal animation and sound.
     */
    dispose(healStack: boolean, animate?: boolean): void;

    /**
     * Play some UI effects (sound, animation) when disposing of a block.
     */
    disposeUiEffect(): void;

    /**
     * Play some UI effects (sound, ripple) after a connection has been established.
     */
    connectionUiEffect(): void;

    /**
     * Play some UI effects (sound, animation) when disconnecting a block.
     */
    disconnectUiEffect(): void;

    /**
     * Change the colour of a block.
     */
    updateColour(): void;

    /**
     * Enable or disable a block.
     */
    updateDisabled(): void;

    /**
     * Returns the comment on this block (or '' if none).
     * @return {string} Block's comment.
     */
    getCommentText(): string;

    /**
     * Set this block's comment text.
     * @param {?string} text The text, or null to delete.
     */
    setCommentText(text: string): void;

    /**
     * Set this block's warning text.
     * @param {?string} text The text, or null to delete.
     * @param {string=} opt_id An optional ID for the warning text to be able to
     *     maintain multiple warnings.
     */
    setWarningText(text: string, opt_id?: string): void;

    /**
     * Give this block a mutator dialog.
     * @param {Blockly.Mutator} mutator A mutator dialog instance or null to remove.
     */
    setMutator(mutator: Blockly.Mutator): void;

    /**
     * Set whether the block is disabled or not.
     * @param {boolean} disabled True if disabled.
     */
    setDisabled(disabled: boolean): void;

    /**
     * Select this block.  Highlight it visually.
     */
    addSelect(): void;

    /**
     * Unselect this block.  Remove its highlighting.
     */
    removeSelect(): void;

    /**
     * Adds the dragging class to this block.
     * Also disables the highlights/shadows to improve performance.
     */
    addDragging(): void;

    /**
     * Removes the dragging class from this block.
     */
    removeDragging(): void;

    /**
     * Change the colour of a block.
     * @param {number|string} colour HSV hue value, or #RRGGBB string.
     */
    setColour(colour: number|string): void;

    /**
     * Set whether this block can chain onto the bottom of another block.
     * @param {boolean} newBoolean True if there can be a previous statement.
     * @param {string|Array.<string>|null|undefined} opt_check Statement type or
     *     list of statement types.  Null/undefined if any type could be connected.
     */
    setPreviousStatement(newBoolean: boolean, opt_check: string|string[]|any /*null*/|any /*undefined*/): void;

    /**
     * Set whether another block can chain onto the bottom of this block.
     * @param {boolean} newBoolean True if there can be a next statement.
     * @param {string|Array.<string>|null|undefined} opt_check Statement type or
     *     list of statement types.  Null/undefined if any type could be connected.
     */
    setNextStatement(newBoolean: boolean, opt_check: string|string[]|any /*null*/|any /*undefined*/): void;

    /**
     * Set whether this block returns a value.
     * @param {boolean} newBoolean True if there is an output.
     * @param {string|Array.<string>|null|undefined} opt_check Returned type or list
     *     of returned types.  Null or undefined if any type could be returned
     *     (e.g. variable get).
     */
    setOutput(newBoolean: boolean, opt_check: string|string[]|any /*null*/|any /*undefined*/): void;

    /**
     * Set whether value inputs are arranged horizontally or vertically.
     * @param {boolean} newBoolean True if inputs are horizontal.
     */
    setInputsInline(newBoolean: boolean): void;

    /**
     * Remove an input from this block.
     * @param {string} name The name of the input.
     * @param {boolean=} opt_quiet True to prevent error if input is not present.
     * @throws {goog.asserts.AssertionError} if the input is not present and
     *     opt_quiet is not true.
     */
    removeInput(name: string, opt_quiet?: boolean): void;

    /**
     * Move a numbered input to a different location on this block.
     * @param {number} inputIndex Index of the input to move.
     * @param {number} refIndex Index of input that should be after the moved input.
     */
    moveNumberedInputBefore(inputIndex: number, refIndex: number): void;

    /**
     * Add a value input, statement input or local variable to this block.
     * @param {number} type Either Blockly.INPUT_VALUE or Blockly.NEXT_STATEMENT or
     *     Blockly.DUMMY_INPUT.
     * @param {string} name Language-neutral identifier which may used to find this
     *     input again.  Should be unique to this block.
     * @return {!Blockly.Input} The input object created.
     * @private
     */
    appendInput_(type: number, name: string): Blockly.Input;

    /**
     * Returns connections originating from this block.
     * @param {boolean} all If true, return all connections even hidden ones.
     *     Otherwise, for a non-rendered block return an empty list, and for a
     *     collapsed block don't return inputs connections.
     * @return {!Array.<!Blockly.Connection>} Array of connections.
     * @private
     */
    getConnections_(all?: boolean): Blockly.Connection[];

    /**
     * Create a connection of the specified type.
     * @param {number} type The type of the connection to create.
     * @return {!Blockly.RenderedConnection} A new connection of the specified type.
     * @private
     */
    makeConnection_(type: number): Blockly.RenderedConnection;
  }

}
declare module Blockly {

  class Bubble extends Bubble__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Bubble__Class  {

    /**
     * Class for UI bubble.
     * @param {!Blockly.WorkspaceSvg} workspace The workspace on which to draw the
     *     bubble.
     * @param {!Element} content SVG content for the bubble.
     * @param {Element} shape SVG element to avoid eclipsing.
     * @param {!goog.math.Coodinate} anchorXY Absolute position of bubble's anchor
     *     point.
     * @param {?number} bubbleWidth Width of bubble, or null if not resizable.
     * @param {?number} bubbleHeight Height of bubble, or null if not resizable.
     * @constructor
     */
    constructor(workspace: Blockly.WorkspaceSvg, content: Element, shape: Element, anchorXY: goog.math.Coordinate, bubbleWidth: number, bubbleHeight: number);

    /**
     * Function to call on resize of bubble.
     * @type {Function}
     */
    resizeCallback_: Function;

    /**
     * Flag to stop incremental rendering during construction.
     * @private
     */
    rendered_: any /*missing*/;

    /**
     * Absolute coordinate of anchor point.
     * @type {goog.math.Coordinate}
     * @private
     */
    anchorXY_: goog.math.Coordinate;

    /**
     * Relative X coordinate of bubble with respect to the anchor's centre.
     * In RTL mode the initial value is negated.
     * @private
     */
    relativeLeft_: any /*missing*/;

    /**
     * Relative Y coordinate of bubble with respect to the anchor's centre.
     * @private
     */
    relativeTop_: any /*missing*/;

    /**
     * Width of bubble.
     * @private
     */
    width_: any /*missing*/;

    /**
     * Height of bubble.
     * @private
     */
    height_: any /*missing*/;

    /**
     * Automatically position and reposition the bubble.
     * @private
     */
    autoLayout_: any /*missing*/;

    /**
     * Create the bubble's DOM.
     * @param {!Element} content SVG content for the bubble.
     * @param {boolean} hasResize Add diagonal resize gripper if true.
     * @return {!Element} The bubble's SVG group.
     * @private
     */
    createDom_(content: Element, hasResize: boolean): Element;

    /**
     * Handle a mouse-down on bubble's border.
     * @param {!Event} e Mouse down event.
     * @private
     */
    bubbleMouseDown_(e: Event): void;

    /**
     * Drag this bubble to follow the mouse.
     * @param {!Event} e Mouse move event.
     * @private
     */
    bubbleMouseMove_(e: Event): void;

    /**
     * Handle a mouse-down on bubble's resize corner.
     * @param {!Event} e Mouse down event.
     * @private
     */
    resizeMouseDown_(e: Event): void;

    /**
     * Resize this bubble to follow the mouse.
     * @param {!Event} e Mouse move event.
     * @private
     */
    resizeMouseMove_(e: Event): void;

    /**
     * Register a function as a callback event for when the bubble is resized.
     * @param {!Function} callback The function to call on resize.
     */
    registerResizeEvent(callback: Function): void;

    /**
     * Move this bubble to the top of the stack.
     * @private
     */
    promote_(): void;

    /**
     * Notification that the anchor has moved.
     * Update the arrow and bubble accordingly.
     * @param {!goog.math.Coordinate} xy Absolute location.
     */
    setAnchorLocation(xy: goog.math.Coordinate): void;

    /**
     * Position the bubble so that it does not fall off-screen.
     * @private
     */
    layoutBubble_(): void;

    /**
     * Move the bubble to a location relative to the anchor's centre.
     * @private
     */
    positionBubble_(): void;

    /**
     * Get the dimensions of this bubble.
     * @return {!Object} Object with width and height properties.
     */
    getBubbleSize(): Object;

    /**
     * Size this bubble.
     * @param {number} width Width of the bubble.
     * @param {number} height Height of the bubble.
     */
    setBubbleSize(width: number, height: number): void;

    /**
     * Draw the arrow between the bubble and the origin.
     * @private
     */
    renderArrow_(): void;

    /**
     * Change the colour of a bubble.
     * @param {string} hexColour Hex code of colour.
     */
    setColour(hexColour: string): void;

    /**
     * Dispose of this bubble.
     */
    dispose(): void;
  }

}
declare module Blockly {

  class Comment extends Comment__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Comment__Class extends Blockly.Icon__Class  {

    /**
     * Class for a comment.
     * @param {!Blockly.Block} block The block associated with this comment.
     * @extends {Blockly.Icon}
     * @constructor
     */
    constructor(block: Blockly.Block);

    /**
     * Comment text (if bubble is not visible).
     * @private
     */
    text_: any /*missing*/;

    /**
     * Width of bubble.
     * @private
     */
    width_: any /*missing*/;

    /**
     * Height of bubble.
     * @private
     */
    height_: any /*missing*/;

    /**
     * Draw the comment icon.
     * @param {!Element} group The icon group.
     * @private
     */
    drawIcon_(group: Element): void;

    /**
     * Create the editor for the comment's bubble.
     * @return {!Element} The top-level node of the editor.
     * @private
     */
    createEditor_(): Element;

    /**
     * Callback function triggered when the bubble has resized.
     * Resize the text area accordingly.
     * @private
     */
    resizeBubble_(): void;

    /**
     * Show or hide the comment bubble.
     * @param {boolean} visible True if the bubble should be visible.
     */
    setVisible(visible: boolean): void;

    /**
     * Bring the comment to the top of the stack when clicked on.
     * @param {!Event} e Mouse up event.
     * @private
     */
    textareaFocus_(e: Event): void;

    /**
     * Get the dimensions of this comment's bubble.
     * @return {!Object} Object with width and height properties.
     */
    getBubbleSize(): Object;

    /**
     * Size this comment's bubble.
     * @param {number} width Width of the bubble.
     * @param {number} height Height of the bubble.
     */
    setBubbleSize(width: number, height: number): void;

    /**
     * Returns this comment's text.
     * @return {string} Comment text.
     */
    getText(): string;

    /**
     * Set this comment's text.
     * @param {string} text Comment text.
     */
    setText(text: string): void;

    /**
     * Dispose of this comment.
     */
    dispose(): void;
  }

}
declare module Blockly {

  class ConnectionDB extends ConnectionDB__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class ConnectionDB__Class  {

    /**
     * Database of connections.
     * Connections are stored in order of their vertical component.  This way
     * connections in an area may be looked up quickly using a binary search.
     * @constructor
     */
    constructor();

    /**
     * Add a connection to the database.  Must not already exist in DB.
     * @param {!Blockly.Connection} connection The connection to be added.
     */
    addConnection(connection: Blockly.Connection): void;

    /**
     * Find the given connection.
     * Starts by doing a binary search to find the approximate location, then
     *     linearly searches nearby for the exact connection.
     * @param {!Blockly.Connection} conn The connection to find.
     * @return {number} The index of the connection, or -1 if the connection was
     *     not found.
     */
    findConnection(conn: Blockly.Connection): number;

    /**
     * Finds a candidate position for inserting this connection into the list.
     * This will be in the correct y order but makes no guarantees about ordering in
     *     the x axis.
     * @param {!Blockly.Connection} connection The connection to insert.
     * @return {number} The candidate index.
     * @private
     */
    findPositionForConnection_(connection: Blockly.Connection): number;

    /**
     * Remove a connection from the database.  Must already exist in DB.
     * @param {!Blockly.Connection} connection The connection to be removed.
     * @private
     */
    removeConnection_(connection: Blockly.Connection): void;

    /**
     * Find all nearby connections to the given connection.
     * Type checking does not apply, since this function is used for bumping.
     * @param {!Blockly.Connection} connection The connection whose neighbours
     *     should be returned.
     * @param {number} maxRadius The maximum radius to another connection.
     * @return {!Array.<Blockly.Connection>} List of connections.
     */
    getNeighbours(connection: Blockly.Connection, maxRadius: number): Blockly.Connection[];

    /**
     * Is the candidate connection close to the reference connection.
     * Extremely fast; only looks at Y distance.
     * @param {number} index Index in database of candidate connection.
     * @param {number} baseY Reference connection's Y value.
     * @param {number} maxRadius The maximum radius to another connection.
     * @return {boolean} True if connection is in range.
     * @private
     */
    isInYRange_(index: number, baseY: number, maxRadius: number): boolean;

    /**
     * Find the closest compatible connection to this connection.
     * @param {!Blockly.Connection} conn The connection searching for a compatible
     *     mate.
     * @param {number} maxRadius The maximum radius to another connection.
     * @param {!goog.math.Coordinate} dxy Offset between this connection's location
     *     in the database and the current location (as a result of dragging).
     * @return {!{connection: ?Blockly.Connection, radius: number}} Contains two
     *     properties:' connection' which is either another connection or null,
     *     and 'radius' which is the distance.
     */
    searchForClosest(conn: Blockly.Connection, maxRadius: number, dxy: goog.math.Coordinate): { connection: Blockly.Connection; radius: number };
  }

}
declare module Blockly {

  class Connection extends Connection__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Connection__Class  {

    /**
     * Class for a connection between blocks.
     * @param {!Blockly.Block} source The block establishing this connection.
     * @param {number} type The type of the connection.
     * @constructor
     */
    constructor(source: Blockly.Block, type: number);

    /**
     * @type {!Blockly.Block}
     * @private
     */
    sourceBlock_: Blockly.Block;

    /** @type {number} */
    type: number;

    /**
     * Connection this connection connects to.  Null if not connected.
     * @type {Blockly.Connection}
     */
    targetConnection: Blockly.Connection;

    /**
     * List of compatible value types.  Null if all types are compatible.
     * @type {Array}
     * @private
     */
    check_: any[];

    /**
     * DOM representation of a shadow block, or null if none.
     * @type {Element}
     * @private
     */
    shadowDom_: Element;

    /**
     * Horizontal location of this connection.
     * @type {number}
     * @private
     */
    x_: number;

    /**
     * Vertical location of this connection.
     * @type {number}
     * @private
     */
    y_: number;

    /**
     * Has this connection been added to the connection database?
     * @type {boolean}
     * @private
     */
    inDB_: boolean;

    /**
     * Connection database for connections of this type on the current workspace.
     * @type {Blockly.ConnectionDB}
     * @private
     */
    db_: Blockly.ConnectionDB;

    /**
     * Connection database for connections compatible with this type on the
     * current workspace.
     * @type {Blockly.ConnectionDB}
     * @private
     */
    dbOpposite_: Blockly.ConnectionDB;

    /**
     * Whether this connections is hidden (not tracked in a database) or not.
     * @type {boolean}
     * @private
     */
    hidden_: boolean;

    /**
     * Connect two connections together.  This is the connection on the superior
     * block.
     * @param {!Blockly.Connection} childConnection Connection on inferior block.
     * @private
     */
    connect_(childConnection: Blockly.Connection): void;

    /**
     * Sever all links to this connection (not including from the source object).
     */
    dispose(): void;

    /**
     * Get the source block for this connection.
     * @return {Blockly.Block} The source block, or null if there is none.
     */
    getSourceBlock(): Blockly.Block;

    /**
     * Does the connection belong to a superior block (higher in the source stack)?
     * @return {boolean} True if connection faces down or right.
     */
    isSuperior(): boolean;

    /**
     * Is the connection connected?
     * @return {boolean} True if connection is connected to another connection.
     */
    isConnected(): boolean;

    /**
     * Checks whether the current connection can connect with the target
     * connection.
     * @param {Blockly.Connection} target Connection to check compatibility with.
     * @return {number} Blockly.Connection.CAN_CONNECT if the connection is legal,
     *    an error code otherwise.
     * @private
     */
    canConnectWithReason_(target: Blockly.Connection): number;

    /**
     * Checks whether the current connection and target connection are compatible
     * and throws an exception if they are not.
     * @param {Blockly.Connection} target The connection to check compatibility
     *    with.
     * @private
     */
    checkConnection_(target: Blockly.Connection): void;

    /**
     * Check if the two connections can be dragged to connect to each other.
     * @param {!Blockly.Connection} candidate A nearby connection to check.
     * @return {boolean} True if the connection is allowed, false otherwise.
     */
    isConnectionAllowed(candidate: Blockly.Connection): boolean;

    /**
     * Connect this connection to another connection.
     * @param {!Blockly.Connection} otherConnection Connection to connect to.
     */
    connect(otherConnection: Blockly.Connection): void;

    /**
     * Disconnect this connection.
     */
    disconnect(): void;

    /**
     * Disconnect two blocks that are connected by this connection.
     * @param {!Blockly.Block} parentBlock The superior block.
     * @param {!Blockly.Block} childBlock The inferior block.
     * @private
     */
    disconnectInternal_(parentBlock: Blockly.Block, childBlock: Blockly.Block): void;

    /**
     * Respawn the shadow block if there was one connected to the this connection.
     * @private
     */
    respawnShadow_(): void;

    /**
     * Returns the block that this connection connects to.
     * @return {Blockly.Block} The connected block or null if none is connected.
     */
    targetBlock(): Blockly.Block;

    /**
     * Is this connection compatible with another connection with respect to the
     * value type system.  E.g. square_root("Hello") is not compatible.
     * @param {!Blockly.Connection} otherConnection Connection to compare against.
     * @return {boolean} True if the connections share a type.
     * @private
     */
    checkType_(otherConnection: Blockly.Connection): boolean;

    /**
     * Change a connection's compatibility.
     * @param {*} check Compatible value type or list of value types.
     *     Null if all types are compatible.
     * @return {!Blockly.Connection} The connection being modified
     *     (to allow chaining).
     */
    setCheck(check: any): Blockly.Connection;

    /**
     * Change a connection's shadow block.
     * @param {Element} shadow DOM representation of a block or null.
     */
    setShadowDom(shadow: Element): void;

    /**
     * Return a connection's shadow block.
     * @return {Element} shadow DOM representation of a block or null.
     */
    getShadowDom(): Element;
  }

}
declare module Blockly {

  /**
   * Number of pixels the mouse must move before a drag starts.
   */
  var DRAG_RADIUS: any /*missing*/;

  /**
   * Maximum misalignment between connections for them to snap together.
   */
  var SNAP_RADIUS: any /*missing*/;

  /**
   * Delay in ms between trigger and bumping unconnected block out of alignment.
   */
  var BUMP_DELAY: any /*missing*/;

  /**
   * Number of characters to truncate a collapsed block to.
   */
  var COLLAPSE_CHARS: any /*missing*/;

  /**
   * Length in ms for a touch to become a long press.
   */
  var LONGPRESS: any /*missing*/;

  /**
   * Prevent a sound from playing if another sound preceded it within this many
   * miliseconds.
   */
  var SOUND_LIMIT: any /*missing*/;

  /**
   * The richness of block colours, regardless of the hue.
   * Must be in the range of 0 (inclusive) to 1 (exclusive).
   */
  var HSV_SATURATION: any /*missing*/;

  /**
   * The intensity of block colours, regardless of the hue.
   * Must be in the range of 0 (inclusive) to 1 (exclusive).
   */
  var HSV_VALUE: any /*missing*/;

  /**
   * Sprited icons and images.
   */
  var SPRITE: any /*missing*/;

  /**
   * Required name space for SVG elements.
   * @const
   */
  var SVG_NS: any /*missing*/;

  /**
   * Required name space for HTML elements.
   * @const
   */
  var HTML_NS: any /*missing*/;

  /**
   * ENUM for a right-facing value input.  E.g. 'set item to' or 'return'.
   * @const
   */
  var INPUT_VALUE: any /*missing*/;

  /**
   * ENUM for a left-facing value output.  E.g. 'random fraction'.
   * @const
   */
  var OUTPUT_VALUE: any /*missing*/;

  /**
   * ENUM for a down-facing block stack.  E.g. 'if-do' or 'else'.
   * @const
   */
  var NEXT_STATEMENT: any /*missing*/;

  /**
   * ENUM for an up-facing block stack.  E.g. 'break out of loop'.
   * @const
   */
  var PREVIOUS_STATEMENT: any /*missing*/;

  /**
   * ENUM for an dummy input.  Used to add field(s) with no input.
   * @const
   */
  var DUMMY_INPUT: any /*missing*/;

  /**
   * ENUM for left alignment.
   * @const
   */
  var ALIGN_LEFT: any /*missing*/;

  /**
   * ENUM for centre alignment.
   * @const
   */
  var ALIGN_CENTRE: any /*missing*/;

  /**
   * ENUM for right alignment.
   * @const
   */
  var ALIGN_RIGHT: any /*missing*/;

  /**
   * ENUM for no drag operation.
   * @const
   */
  var DRAG_NONE: any /*missing*/;

  /**
   * ENUM for inside the sticky DRAG_RADIUS.
   * @const
   */
  var DRAG_STICKY: any /*missing*/;

  /**
   * ENUM for inside the non-sticky DRAG_RADIUS, for differentiating between
   * clicks and drags.
   * @const
   */
  var DRAG_BEGIN: any /*missing*/;

  /**
   * ENUM for freely draggable (outside the DRAG_RADIUS, if one applies).
   * @const
   */
  var DRAG_FREE: any /*missing*/;

  /**
   * Lookup table for determining the opposite type of a connection.
   * @const
   */
  var OPPOSITE_TYPE: any /*missing*/;

  /**
   * ENUM for toolbox and flyout at top of screen.
   * @const
   */
  var TOOLBOX_AT_TOP: any /*missing*/;

  /**
   * ENUM for toolbox and flyout at bottom of screen.
   * @const
   */
  var TOOLBOX_AT_BOTTOM: any /*missing*/;

  /**
   * ENUM for toolbox and flyout at left of screen.
   * @const
   */
  var TOOLBOX_AT_LEFT: any /*missing*/;

  /**
   * ENUM for toolbox and flyout at right of screen.
   * @const
   */
  var TOOLBOX_AT_RIGHT: any /*missing*/;
}
declare module Blockly {

  class FieldAngle extends FieldAngle__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class FieldAngle__Class extends Blockly.FieldTextInput__Class  {

    /**
     * Class for an editable angle field.
     * @param {string} text The initial content of the field.
     * @param {Function=} opt_validator An optional function that is called
     *     to validate any constraints on what the user entered.  Takes the new
     *     text as an argument and returns the accepted text or null to abort
     *     the change.
     * @extends {Blockly.FieldTextInput}
     * @constructor
     */
    constructor(text: string, opt_validator?: Function);

    /**
     * Clean up this FieldAngle, as well as the inherited FieldTextInput.
     * @return {!Function} Closure to call on destruction of the WidgetDiv.
     * @private
     */
    dispose_(): Function;

    /**
     * Show the inline free-text editor on top of the text.
     * @private
     */
    showEditor_(): void;

    /**
     * Set the angle to match the mouse's position.
     * @param {!Event} e Mouse move event.
     */
    onMouseMove(e: Event): void;

    /**
     * Insert a degree symbol.
     * @param {?string} text New text.
     */
    setText(text: string): void;

    /**
     * Redraw the graph with the current angle.
     * @private
     */
    updateGraph_(): void;

    /**
     * Ensure that only an angle may be entered.
     * @param {string} text The user's text.
     * @return {?string} A string representing a valid angle, or null if invalid.
     */
    classValidator(text: string): string;
  }

}
declare module Blockly {

  class FieldCheckbox extends FieldCheckbox__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class FieldCheckbox__Class extends Blockly.Field__Class  {

    /**
     * Class for a checkbox field.
     * @param {string} state The initial state of the field ('TRUE' or 'FALSE').
     * @param {Function=} opt_validator A function that is executed when a new
     *     option is selected.  Its sole argument is the new checkbox state.  If
     *     it returns a value, this becomes the new checkbox state, unless the
     *     value is null, in which case the change is aborted.
     * @extends {Blockly.Field}
     * @constructor
     */
    constructor(state: string, opt_validator?: Function);

    /**
     * Mouse cursor style when over the hotspot that initiates editability.
     */
    CURSOR: any /*missing*/;

    /**
     * Install this checkbox on a block.
     */
    init(): void;

    /**
     * Return 'TRUE' if the checkbox is checked, 'FALSE' otherwise.
     * @return {string} Current state.
     */
    getValue(): string;

    /**
     * Set the checkbox to be checked if strBool is 'TRUE', unchecks otherwise.
     * @param {string} strBool New state.
     */
    setValue(strBool: string): void;

    /**
     * Toggle the state of the checkbox.
     * @private
     */
    showEditor_(): void;
  }

}
declare module Blockly {

  class FieldImage extends FieldImage__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class FieldImage__Class extends Blockly.Field__Class  {

    /**
     * Class for an image.
     * @param {string} src The URL of the image.
     * @param {number} width Width of the image.
     * @param {number} height Height of the image.
     * @param {string=} opt_alt Optional alt text for when block is collapsed.
     * @extends {Blockly.Field}
     * @constructor
     */
    constructor(src: string, width: number, height: number, opt_alt?: string);

    /**
     * Due to a Firefox bug which eats mouse events on image elements,
     * a transparent rectangle needs to be placed on top of the image.
     * @type {SVGElement}
     */
    rectElement_: SVGElement;

    /**
     * Editable fields are saved by the XML renderer, non-editable fields are not.
     */
    EDITABLE: any /*missing*/;

    /**
     * Install this image on a block.
     */
    init(): void;

    /** @type {SVGElement} */
    fieldGroup_: SVGElement;

    /** @type {SVGElement} */
    imageElement_: SVGElement;

    /**
     * Dispose of all DOM objects belonging to this text.
     */
    dispose(): void;

    /**
     * Change the tooltip text for this field.
     * @param {string|!Element} newTip Text for tooltip or a parent element to
     *     link to for its tooltip.
     */
    setTooltip(newTip: string|Element): void;

    /**
     * Images are fixed width, no need to render.
     * @private
     */
    render_(): void;
  }

}
declare module Blockly {

  class FieldLabel extends FieldLabel__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class FieldLabel__Class extends Blockly.Field__Class  {

    /**
     * Class for a non-editable field.
     * @param {string} text The initial content of the field.
     * @param {string=} opt_class Optional CSS class for the field's text.
     * @extends {Blockly.Field}
     * @constructor
     */
    constructor(text: string, opt_class?: string);

    /**
     * Editable fields are saved by the XML renderer, non-editable fields are not.
     */
    EDITABLE: any /*missing*/;

    /**
     * Install this text on a block.
     */
    init(): void;

    /**
     * Dispose of all DOM objects belonging to this text.
     */
    dispose(): void;

    /**
     * Gets the group element for this field.
     * Used for measuring the size and for positioning.
     * @return {!Element} The group element.
     */
    getSvgRoot(): Element;

    /**
     * Change the tooltip text for this field.
     * @param {string|!Element} newTip Text for tooltip or a parent element to
     *     link to for its tooltip.
     */
    setTooltip(newTip: string|Element): void;
  }

}
declare module Blockly {

  class FieldNumber extends FieldNumber__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class FieldNumber__Class extends Blockly.FieldTextInput__Class  {

    /**
     * Class for an editable number field.
     * @param {number|string} value The initial content of the field.
     * @param {number|string|undefined} opt_min Minimum value.
     * @param {number|string|undefined} opt_max Maximum value.
     * @param {number|string|undefined} opt_precision Precision for value.
     * @param {Function=} opt_validator An optional function that is called
     *     to validate any constraints on what the user entered.  Takes the new
     *     text as an argument and returns either the accepted text, a replacement
     *     text, or null to abort the change.
     * @extends {Blockly.FieldTextInput}
     * @constructor
     */
    constructor(value: number|string, opt_min: number|string|any /*undefined*/, opt_max: number|string|any /*undefined*/, opt_precision: number|string|any /*undefined*/, opt_validator?: Function);

    /**
     * Set the maximum, minimum and precision constraints on this field.
     * Any of these properties may be undefiend or NaN to be disabled.
     * Setting precision (usually a power of 10) enforces a minimum step between
     * values. That is, the user's value will rounded to the closest multiple of
     * precision. The least significant digit place is inferred from the precision.
     * Integers values can be enforces by choosing an integer precision.
     * @param {number|string|undefined} min Minimum value.
     * @param {number|string|undefined} max Maximum value.
     * @param {number|string|undefined} precision Precision for value.
     */
    setConstraints(min: number|string|any /*undefined*/, max: number|string|any /*undefined*/, precision: number|string|any /*undefined*/): void;

    /**
     * Ensure that only a number in the correct range may be entered.
     * @param {string} text The user's text.
     * @return {?string} A string representing a valid number, or null if invalid.
     */
    classValidator(text: string): string;
  }

}
declare module Blockly {

  class FieldTextInput extends FieldTextInput__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class FieldTextInput__Class extends Blockly.Field__Class  {

    /**
     * Class for an editable text field.
     * @param {string} text The initial content of the field.
     * @param {Function=} opt_validator An optional function that is called
     *     to validate any constraints on what the user entered.  Takes the new
     *     text as an argument and returns either the accepted text, a replacement
     *     text, or null to abort the change.
     * @extends {Blockly.Field}
     * @constructor
     */
    constructor(text: string, opt_validator?: Function);

    /**
     * Mouse cursor style when over the hotspot that initiates the editor.
     */
    CURSOR: any /*missing*/;

    /**
     * Allow browser to spellcheck this field.
     * @private
     */
    spellcheck_: any /*missing*/;

    /**
     * Close the input widget if this input is being deleted.
     */
    dispose(): void;

    /**
     * Set whether this field is spellchecked by the browser.
     * @param {boolean} check True if checked.
     */
    setSpellcheck(check: boolean): void;

    /**
     * Show the inline free-text editor on top of the text.
     * @param {boolean=} opt_quietInput True if editor should be created without
     *     focus.  Defaults to false.
     * @private
     */
    showEditor_(opt_quietInput?: boolean): void;

    /**
     * Handle key down to the editor.
     * @param {!Event} e Keyboard event.
     * @private
     */
    onHtmlInputKeyDown_(e: Event): void;

    /**
     * Handle a change to the editor.
     * @param {!Event} e Keyboard event.
     * @private
     */
    onHtmlInputChange_(e: Event): void;

    /**
     * Check to see if the contents of the editor validates.
     * Style the editor accordingly.
     * @private
     */
    validate_(): void;

    /**
     * Resize the editor and the underlying block to fit the text.
     * @private
     */
    resizeEditor_(): void;

    /**
     * Close the editor, save the results, and dispose of the editable
     * text field's elements.
     * @return {!Function} Closure to call on destruction of the WidgetDiv.
     * @private
     */
    widgetDispose_(): Function;
  }

}
declare module Blockly {

  /**
   * PID of queued long-press task.
   * @private
   */
  var longPid_: any /*missing*/;

  /**
   * Context menus on touch devices are activated using a long-press.
   * Unfortunately the contextmenu touch event is currently (2015) only suported
   * by Chrome.  This function is fired on any touchstart event, queues a task,
   * which after about a second opens the context menu.  The tasks is killed
   * if the touch event terminates early.
   * @param {!Event} e Touch start event.
   * @param {!Blockly.Block|!Blockly.WorkspaceSvg} uiObject The block or workspace
   *     under the touchstart event.
   * @private
   */
  function longStart_(e: Event, uiObject: Blockly.Block|Blockly.WorkspaceSvg): void;

  /**
   * Nope, that's not a long-press.  Either touchend or touchcancel was fired,
   * or a drag hath begun.  Kill the queued long-press task.
   * @private
   */
  function longStop_(): void;

  /**
   * Handle a mouse-up anywhere on the page.
   * @param {!Event} e Mouse up event.
   * @private
   */
  function onMouseUp_(e: Event): void;

  /**
   * Handle a mouse-move on SVG drawing surface.
   * @param {!Event} e Mouse move event.
   * @private
   */
  function onMouseMove_(e: Event): void;
}
declare module Blockly {

  class Trashcan extends Trashcan__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Trashcan__Class  {

    /**
     * Class for a trash can.
     * @param {!Blockly.Workspace} workspace The workspace to sit in.
     * @constructor
     */
    constructor(workspace: Blockly.Workspace);

    /**
     * Width of both the trash can and lid images.
     * @type {number}
     * @private
     */
    WIDTH_: number;

    /**
     * Height of the trashcan image (minus lid).
     * @type {number}
     * @private
     */
    BODY_HEIGHT_: number;

    /**
     * Height of the lid image.
     * @type {number}
     * @private
     */
    LID_HEIGHT_: number;

    /**
     * Distance between trashcan and bottom edge of workspace.
     * @type {number}
     * @private
     */
    MARGIN_BOTTOM_: number;

    /**
     * Distance between trashcan and right edge of workspace.
     * @type {number}
     * @private
     */
    MARGIN_SIDE_: number;

    /**
     * Extent of hotspot on all sides beyond the size of the image.
     * @type {number}
     * @private
     */
    MARGIN_HOTSPOT_: number;

    /**
     * Location of trashcan in sprite image.
     * @type {number}
     * @private
     */
    SPRITE_LEFT_: number;

    /**
     * Location of trashcan in sprite image.
     * @type {number}
     * @private
     */
    SPRITE_TOP_: number;

    /**
     * Current open/close state of the lid.
     * @type {boolean}
     */
    isOpen: boolean;

    /**
     * The SVG group containing the trash can.
     * @type {Element}
     * @private
     */
    svgGroup_: Element;

    /**
     * The SVG image element of the trash can lid.
     * @type {Element}
     * @private
     */
    svgLid_: Element;

    /**
     * Task ID of opening/closing animation.
     * @type {number}
     * @private
     */
    lidTask_: number;

    /**
     * Current state of lid opening (0.0 = closed, 1.0 = open).
     * @type {number}
     * @private
     */
    lidOpen_: number;

    /**
     * Left coordinate of the trash can.
     * @type {number}
     * @private
     */
    left_: number;

    /**
     * Top coordinate of the trash can.
     * @type {number}
     * @private
     */
    top_: number;

    /**
     * Create the trash can elements.
     * @return {!Element} The trash can's SVG group.
     */
    createDom(): Element;

    /**
     * Initialize the trash can.
     * @param {number} bottom Distance from workspace bottom to bottom of trashcan.
     * @return {number} Distance from workspace bottom to the top of trashcan.
     */
    init(bottom: number): number;

    /**
     * Dispose of this trash can.
     * Unlink from all DOM elements to prevent memory leaks.
     */
    dispose(): void;

    /**
     * Move the trash can to the bottom-right corner.
     */
    position(): void;

    /**
     * Return the deletion rectangle for this trash can.
     * @return {goog.math.Rect} Rectangle in which to delete.
     */
    getClientRect(): goog.math.Rect;

    /**
     * Flip the lid open or shut.
     * @param {boolean} state True if open.
     * @private
     */
    setOpen_(state: boolean): void;

    /**
     * Rotate the lid open or closed by one step.  Then wait and recurse.
     * @private
     */
    animateLid_(): void;

    /**
     * Flip the lid shut.
     * Called externally after a drag.
     */
    close(): void;

    /**
     * Inspect the contents of the trash.
     */
    click(): void;
  }

}
declare module Blockly {

  /**
   * Add a CSS class to a element.
   * Similar to Closure's goog.dom.classes.add, except it handles SVG elements.
   * @param {!Element} element DOM element to add class to.
   * @param {string} className Name of class to add.
   * @private
   */
  function addClass_(element: Element, className: string): void;

  /**
   * Remove a CSS class from a element.
   * Similar to Closure's goog.dom.classes.remove, except it handles SVG elements.
   * @param {!Element} element DOM element to remove class from.
   * @param {string} className Name of class to remove.
   * @private
   */
  function removeClass_(element: Element, className: string): void;

  /**
   * Checks if an element has the specified CSS class.
   * Similar to Closure's goog.dom.classes.has, except it handles SVG elements.
   * @param {!Element} element DOM element to check.
   * @param {string} className Name of class to check.
   * @return {boolean} True if class exists, false otherwise.
   * @private
   */
  function hasClass_(element: Element, className: string): boolean;

  /**
   * Bind an event to a function call.  When calling the function, verifies that
   * it belongs to the touch stream that is currently being processsed, and splits
   * multitouch events into multiple events as needed.
   * @param {!Node} node Node upon which to listen.
   * @param {string} name Event name to listen to (e.g. 'mousedown').
   * @param {Object} thisObject The value of 'this' in the function.
   * @param {!Function} func Function to call when event is triggered.
   * @param {boolean} opt_noCaptureIdentifier True if triggering on this event
   *     should not block execution of other event handlers on this touch or other
   *     simultaneous touches.
   * @return {!Array.<!Array>} Opaque data that can be passed to unbindEvent_.
   * @private
   */
  function bindEventWithChecks_(node: Node, name: string, thisObject: Object, func: Function, opt_noCaptureIdentifier: boolean): any[][];

  /**
   * Bind an event to a function call.  Handles multitouch events by using the
   * coordinates of the first changed touch, and doesn't do any safety checks for
   * simultaneous event processing.
   * @deprecated in favor of bindEventWithChecks_, but preserved for external
   * users.
   * @param {!Node} node Node upon which to listen.
   * @param {string} name Event name to listen to (e.g. 'mousedown').
   * @param {Object} thisObject The value of 'this' in the function.
   * @param {!Function} func Function to call when event is triggered.
   * @return {!Array.<!Array>} Opaque data that can be passed to unbindEvent_.
   * @private
   */
  function bindEvent_(node: Node, name: string, thisObject: Object, func: Function): any[][];

  /**
   * Unbind one or more events event from a function call.
   * @param {!Array.<!Array>} bindData Opaque data from bindEvent_.  This list is
   *     emptied during the course of calling this function.
   * @return {!Function} The function call.
   * @private
   */
  function unbindEvent_(bindData: any[][]): Function;

  /**
   * Don't do anything for this event, just halt propagation.
   * @param {!Event} e An event.
   */
  function noEvent(e: Event): void;

  /**
   * Is this event targeting a text input widget?
   * @param {!Event} e An event.
   * @return {boolean} True if text input.
   * @private
   */
  function isTargetInput_(e: Event): boolean;

  /**
   * Return the coordinates of the top-left corner of this element relative to
   * its parent.  Only for SVG elements and children (e.g. rect, g, path).
   * @param {!Element} element SVG element to find the coordinates of.
   * @return {!goog.math.Coordinate} Object with .x and .y properties.
   * @private
   */
  function getRelativeXY_(element: Element): goog.math.Coordinate;

  /**
   * Return the absolute coordinates of the top-left corner of this element,
   * scales that after canvas SVG element, if it's a descendant.
   * The origin (0,0) is the top-left corner of the Blockly SVG.
   * @param {!Element} element Element to find the coordinates of.
   * @param {!Blockly.Workspace} workspace Element must be in this workspace.
   * @return {!goog.math.Coordinate} Object with .x and .y properties.
   * @private
   */
  function getSvgXY_(element: Element, workspace: Blockly.Workspace): goog.math.Coordinate;

  /**
   * Helper method for creating SVG elements.
   * @param {string} name Element's tag name.
   * @param {!Object} attrs Dictionary of attribute names and values.
   * @param {Element} parent Optional parent on which to append the element.
   * @param {Blockly.Workspace=} opt_workspace Optional workspace for access to
   *     context (scale...).
   * @return {!SVGElement} Newly created SVG element.
   */
  function createSvgElement(name: string, attrs: Object, parent: Element, opt_workspace?: Blockly.Workspace): SVGElement;

  /**
   * Is this event a right-click?
   * @param {!Event} e Mouse event.
   * @return {boolean} True if right-click.
   */
  function isRightButton(e: Event): boolean;

  /**
   * Return the converted coordinates of the given mouse event.
   * The origin (0,0) is the top-left corner of the Blockly svg.
   * @param {!Event} e Mouse event.
   * @param {!Element} svg SVG element.
   * @param {SVGMatrix} matrix Inverted screen CTM to use.
   * @return {!Object} Object with .x and .y properties.
   */
  function mouseToSvg(e: Event, svg: Element, matrix: SVGMatrix): Object;

  /**
   * Given an array of strings, return the length of the shortest one.
   * @param {!Array.<string>} array Array of strings.
   * @return {number} Length of shortest string.
   */
  function shortestStringLength(array: string[]): number;

  /**
   * Given an array of strings, return the length of the common prefix.
   * Words may not be split.  Any space after a word is included in the length.
   * @param {!Array.<string>} array Array of strings.
   * @param {number=} opt_shortest Length of shortest string.
   * @return {number} Length of common prefix.
   */
  function commonWordPrefix(array: string[], opt_shortest?: number): number;

  /**
   * Given an array of strings, return the length of the common suffix.
   * Words may not be split.  Any space after a word is included in the length.
   * @param {!Array.<string>} array Array of strings.
   * @param {number=} opt_shortest Length of shortest string.
   * @return {number} Length of common suffix.
   */
  function commonWordSuffix(array: string[], opt_shortest?: number): number;

  /**
   * Is the given string a number (includes negative and decimals).
   * @param {string} str Input string.
   * @return {boolean} True if number, false otherwise.
   */
  function isNumber(str: string): boolean;

  /**
   * Generate a unique ID.  This should be globally unique.
   * 87 characters ^ 20 length > 128 bits (better than a UUID).
   * @return {string} A globally unique ID string.
   */
  function genUid(): string;
}
declare module Blockly {

  class FieldColour extends FieldColour__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class FieldColour__Class extends Blockly.Field__Class  {

    /**
     * Class for a colour input field.
     * @param {string} colour The initial colour in '#rrggbb' format.
     * @param {Function=} opt_validator A function that is executed when a new
     *     colour is selected.  Its sole argument is the new colour value.  Its
     *     return value becomes the selected colour, unless it is undefined, in
     *     which case the new colour stands, or it is null, in which case the change
     *     is aborted.
     * @extends {Blockly.Field}
     * @constructor
     */
    constructor(colour: string, opt_validator?: Function);

    /**
     * By default use the global constants for colours.
     * @type {Array.<string>}
     * @private
     */
    colours_: string[];

    /**
     * By default use the global constants for columns.
     * @type {number}
     * @private
     */
    columns_: number;

    /**
     * Install this field on a block.
     */
    init(): void;

    /**
     * Mouse cursor style when over the hotspot that initiates the editor.
     */
    CURSOR: any /*missing*/;

    /**
     * Close the colour picker if this input is being deleted.
     */
    dispose(): void;

    /**
     * Return the current colour.
     * @return {string} Current colour in '#rrggbb' format.
     */
    getValue(): string;

    /**
     * Set the colour.
     * @param {string} colour The new colour in '#rrggbb' format.
     */
    setValue(colour: string): void;

    /**
     * Get the text from this field.  Used when the block is collapsed.
     * @return {string} Current text.
     */
    getText(): string;

    /**
     * Set a custom colour grid for this field.
     * @param {Array.<string>} colours Array of colours for this block,
     *     or null to use default (Blockly.FieldColour.COLOURS).
     * @return {!Blockly.FieldColour} Returns itself (for method chaining).
     */
    setColours(colours: string[]): Blockly.FieldColour;

    /**
     * Set a custom grid size for this field.
     * @param {number} columns Number of columns for this block,
     *     or 0 to use default (Blockly.FieldColour.COLUMNS).
     * @return {!Blockly.FieldColour} Returns itself (for method chaining).
     */
    setColumns(columns: number): Blockly.FieldColour;

    /**
     * Create a palette under the colour field.
     * @private
     */
    showEditor_(): void;
  }

}
declare module Blockly {

  class FieldDate extends FieldDate__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class FieldDate__Class extends Blockly.Field__Class  {

    /**
     * Class for a date input field.
     * @param {string} date The initial date.
     * @param {Function=} opt_validator A function that is executed when a new
     *     date is selected.  Its sole argument is the new date value.  Its
     *     return value becomes the selected date, unless it is undefined, in
     *     which case the new date stands, or it is null, in which case the change
     *     is aborted.
     * @extends {Blockly.Field}
     * @constructor
     */
    constructor(date: string, opt_validator?: Function);

    /**
     * Mouse cursor style when over the hotspot that initiates the editor.
     */
    CURSOR: any /*missing*/;

    /**
     * Close the colour picker if this input is being deleted.
     */
    dispose(): void;

    /**
     * Return the current date.
     * @return {string} Current date.
     */
    getValue(): string;

    /**
     * Set the date.
     * @param {string} date The new date.
     */
    setValue(date: string): void;

    /**
     * Create a date picker under the date field.
     * @private
     */
    showEditor_(): void;
  }

}
declare module Blockly {

  class FieldDropdown extends FieldDropdown__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class FieldDropdown__Class extends Blockly.Field__Class  {

    /**
     * Class for an editable dropdown field.
     * @param {(!Array.<!Array.<string>>|!Function)} menuGenerator An array of
     *     options for a dropdown list, or a function which generates these options.
     * @param {Function=} opt_validator A function that is executed when a new
     *     option is selected, with the newly selected value as its sole argument.
     *     If it returns a value, that value (which must be one of the options) will
     *     become selected in place of the newly selected option, unless the return
     *     value is null, in which case the change is aborted.
     * @extends {Blockly.Field}
     * @constructor
     */
    constructor(menuGenerator: string[][]|Function, opt_validator?: Function);

    /**
     * Mouse cursor style when over the hotspot that initiates the editor.
     */
    CURSOR: any /*missing*/;

    /**
     * Install this dropdown on a block.
     */
    init(): void;

    /**
     * Create a dropdown menu under the text.
     * @private
     */
    showEditor_(): void;

    /**
     * Factor out common words in statically defined options.
     * Create prefix and/or suffix labels.
     * @private
     */
    trimOptions_(): void;

    /**
     * Return a list of the options for this dropdown.
     * @return {!Array.<!Array.<string>>} Array of option tuples:
     *     (human-readable text, language-neutral name).
     * @private
     */
    getOptions_(): string[][];

    /**
     * Get the language-neutral value from this dropdown menu.
     * @return {string} Current text.
     */
    getValue(): string;

    /**
     * Set the language-neutral value for this dropdown menu.
     * @param {string} newValue New value to set.
     */
    setValue(newValue: string): void;

    /**
     * Set the text in this field.  Trigger a rerender of the source block.
     * @param {?string} text New text.
     */
    setText(text: string): void;

    /**
     * Close the dropdown menu if this input is being deleted.
     */
    dispose(): void;
  }

}
declare module Blockly {

  class Input extends Input__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Input__Class  {

    /**
     * Class for an input with an optional field.
     * @param {number} type The type of the input.
     * @param {string} name Language-neutral identifier which may used to find this
     *     input again.
     * @param {!Blockly.Block} block The block containing this input.
     * @param {Blockly.Connection} connection Optional connection for this input.
     * @constructor
     */
    constructor(type: number, name: string, block: Blockly.Block, connection: Blockly.Connection);

    /** @type {number} */
    type: number;

    /** @type {string} */
    name: string;

    /**
     * @type {!Blockly.Block}
     * @private
     */
    sourceBlock_: Blockly.Block;

    /** @type {Blockly.Connection} */
    connection: Blockly.Connection;

    /** @type {!Array.<!Blockly.Field>} */
    fieldRow: Blockly.Field[];

    /**
     * Alignment of input's fields (left, right or centre).
     * @type {number}
     */
    align: number;

    /**
     * Is the input visible?
     * @type {boolean}
     * @private
     */
    visible_: boolean;

    /**
     * Add an item to the end of the input's field row.
     * @param {string|!Blockly.Field} field Something to add as a field.
     * @param {string=} opt_name Language-neutral identifier which may used to find
     *     this field again.  Should be unique to the host block.
     * @return {!Blockly.Input} The input being append to (to allow chaining).
     */
    appendField(field: string|Blockly.Field, opt_name?: string): Blockly.Input;

    /**
     * Add an item to the end of the input's field row.
     * @param {*} field Something to add as a field.
     * @param {string=} opt_name Language-neutral identifier which may used to find
     *     this field again.  Should be unique to the host block.
     * @return {!Blockly.Input} The input being append to (to allow chaining).
     * @deprecated December 2013
     */
    appendTitle(field: any, opt_name?: string): Blockly.Input;

    /**
     * Remove a field from this input.
     * @param {string} name The name of the field.
     * @throws {goog.asserts.AssertionError} if the field is not present.
     */
    removeField(name: string): void;

    /**
     * Gets whether this input is visible or not.
     * @return {boolean} True if visible.
     */
    isVisible(): boolean;

    /**
     * Sets whether this input is visible or not.
     * Used to collapse/uncollapse a block.
     * @param {boolean} visible True if visible.
     * @return {!Array.<!Blockly.Block>} List of blocks to render.
     */
    setVisible(visible: boolean): Blockly.Block[];

    /**
     * Change a connection's compatibility.
     * @param {string|Array.<string>|null} check Compatible value type or
     *     list of value types.  Null if all types are compatible.
     * @return {!Blockly.Input} The input being modified (to allow chaining).
     */
    setCheck(check: string|string[]|any /*null*/): Blockly.Input;

    /**
     * Change the alignment of the connection's field(s).
     * @param {number} align One of Blockly.ALIGN_LEFT, ALIGN_CENTRE, ALIGN_RIGHT.
     *   In RTL mode directions are reversed, and ALIGN_RIGHT aligns to the left.
     * @return {!Blockly.Input} The input being modified (to allow chaining).
     */
    setAlign(align: number): Blockly.Input;

    /**
     * Initialize the fields on this input.
     */
    init(): void;

    /**
     * Sever all links to this input.
     */
    dispose(): void;
  }

}
declare module Blockly {

  class Field extends Field__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Field__Class  {

    /**
     * Abstract class for an editable field.
     * @param {string} text The initial content of the field.
     * @param {Function=} opt_validator An optional function that is called
     *     to validate any constraints on what the user entered.  Takes the new
     *     text as an argument and returns either the accepted text, a replacement
     *     text, or null to abort the change.
     * @constructor
     */
    constructor(text: string, opt_validator?: Function);

    /**
     * Name of field.  Unique within each block.
     * Static labels are usually unnamed.
     * @type {string=}
     */
    name: any /*missing*/;

    /**
     * Maximum characters of text to display before adding an ellipsis.
     * @type {number}
     */
    maxDisplayLength: number;

    /**
     * Visible text to display.
     * @type {string}
     * @private
     */
    text_: string;
    value_: string;

    /**
     * Block this field is attached to.  Starts as null, then in set in init.
     * @type {Blockly.Block}
     * @private
     */
    public sourceBlock_: Blockly.Block;

    /**
     * Is the field visible, or hidden due to the block being collapsed?
     * @type {boolean}
     * @private
     */
    visible_: boolean;

    /**
     * Validation function called when user edits an editable field.
     * @type {Function}
     * @private
     */
    validator_: Function;

    /**
     * Editable fields are saved by the XML renderer, non-editable fields are not.
     */
    EDITABLE: any /*missing*/;

    /**
     * Attach this field to a block.
     * @param {!Blockly.Block} block The block containing this field.
     */
    setSourceBlock(block: Blockly.Block): void;

    /**
     * Install this field on a block.
     */
    init(): void;

    /** @type {!Element} */
    textElement_: Element;

    /**
     * Dispose of all DOM objects belonging to this editable field.
     */
    dispose(): void;

    /**
     * Add or remove the UI indicating if this field is editable or not.
     */
    updateEditable(): void;

    /**
     * Gets whether this editable field is visible or not.
     * @return {boolean} True if visible.
     */
    isVisible(): boolean;

    /**
     * Sets whether this editable field is visible or not.
     * @param {boolean} visible True if visible.
     */
    setVisible(visible: boolean): void;

    /**
     * Sets a new validation function for editable fields.
     * @param {Function} handler New validation function, or null.
     */
    setValidator(handler: Function): void;

    /**
     * Gets the validation function for editable fields.
     * @return {Function} Validation function, or null.
     */
    getValidator(): Function;

    /**
     * Validates a change.  Does nothing.  Subclasses may override this.
     * @param {string} text The user's text.
     * @return {string} No change needed.
     */
    classValidator(text: string): string;

    /**
     * Calls the validation function for this field, as well as all the validation
     * function for the field's class and its parents.
     * @param {string} text Proposed text.
     * @return {?string} Revised text, or null if invalid.
     */
    callValidator(text: string): string;

    /**
     * Gets the group element for this editable field.
     * Used for measuring the size and for positioning.
     * @return {!Element} The group element.
     */
    getSvgRoot(): Element;

    /**
     * Draws the border with the correct width.
     * Saves the computed width in a property.
     * @private
     */
    render_(): void;

    /**
     * Returns the height and width of the field.
     * @return {!goog.math.Size} Height and width.
     */
    getSize(): goog.math.Size;

    /**
     * Returns the height and width of the field,
     * accounting for the workspace scaling.
     * @return {!goog.math.Size} Height and width.
     * @private
     */
    getScaledBBox_(): goog.math.Size;

    /**
     * Get the text from this field.
     * @return {string} Current text.
     */
    getText(): string;

    /**
     * Set the text in this field.  Trigger a rerender of the source block.
     * @param {*} text New text.
     */
    setText(text: any): void;

    /**
     * Update the text node of this field to display the current text.
     * @private
     */
    updateTextNode_(): void;

    /**
     * By default there is no difference between the human-readable text and
     * the language-neutral values.  Subclasses (such as dropdown) may define this.
     * @return {string} Current text.
     */
    getValue(): string;

    /**
     * By default there is no difference between the human-readable text and
     * the language-neutral values.  Subclasses (such as dropdown) may define this.
     * @param {string} newText New text.
     */
    setValue(newText: string): void;

    /**
     * Handle a mouse up event on an editable field.
     * @param {!Event} e Mouse up event.
     * @private
     */
    onMouseUp_(e: Event): void;

    /**
     * Change the tooltip text for this field.
     * @param {string|!Element} newTip Text for tooltip or a parent element to
     *     link to for its tooltip.
     */
    setTooltip(newTip: string|Element): void;

    /**
     * Return the absolute coordinates of the top-left corner of this field.
     * The origin (0,0) is the top-left corner of the page body.
     * @return {!goog.math.Coordinate} Object with .x and .y properties.
     * @private
     */
    getAbsoluteXY_(): goog.math.Coordinate;
  }

  interface BlockDefinition {
    codeCard?: any;
    init: () => void;
    getVars?: () => any[];
    renameVar?: (oldName: string, newName: string) => void;
    customContextMenu?: any;
    mutationToDom?: () => any;
    domToMutation?: (xmlElement: any) => void;
  }

  const Blocks: {
    [index: string]: BlockDefinition;
  }
}
declare module Blockly {

  class FieldVariable extends FieldVariable__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class FieldVariable__Class extends Blockly.FieldDropdown__Class  {

    /**
     * Class for a variable's dropdown field.
     * @param {?string} varname The default name for the variable.  If null,
     *     a unique variable name will be generated.
     * @param {Function=} opt_validator A function that is executed when a new
     *     option is selected.  Its sole argument is the new option value.
     * @extends {Blockly.FieldDropdown}
     * @constructor
     */
    constructor(varname: string, opt_validator?: Function);

    /**
     * Install this dropdown on a block.
     */
    init(): void;

    /**
     * Get the variable's name (use a variableDB to convert into a real name).
     * Unline a regular dropdown, variables are literal and have no neutral value.
     * @return {string} Current text.
     */
    getValue(): string;

    /**
     * Set the variable name.
     * @param {string} newValue New text.
     */
    setValue(newValue: string): void;

    /**
     * Event handler for a change in variable name.
     * Special case the 'Rename variable...' and 'Delete variable...' options.
     * In the rename case, prompt the user for a new name.
     * @param {string} text The selected dropdown menu option.
     * @return {null|undefined|string} An acceptable new variable name, or null if
     *     change is to be either aborted (cancel button) or has been already
     *     handled (rename), or undefined if an existing variable was chosen.
     */
    classValidator(text: string): any /*null*/|any /*undefined*/|string;
  }

}
declare module Blockly {

  class FlyoutButton extends FlyoutButton__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class FlyoutButton__Class  {

    /**
     * Class for a button in the flyout.
     * @param {!Blockly.Workspace} workspace The workspace in which to place this
     *     button.
     * @param {!Blockly.Workspace} targetWorkspace The flyout's target workspace.
     * @param {string} text The text to display on the button.
     * @constructor
     */
    constructor(workspace: Blockly.Workspace, targetWorkspace: Blockly.Workspace, text: string);

    /**
     * @type {!Blockly.Workspace}
     * @private
     */
    workspace_: Blockly.Workspace;

    /**
     * @type {!Blockly.Workspace}
     * @private
     */
    targetWorkspace_: Blockly.Workspace;

    /**
     * @type {string}
     * @private
     */
    text_: string;

    /**
     * @type {!goog.math.Coordinate}
     * @private
     */
    position_: goog.math.Coordinate;

    /**
     * The width of the button's rect.
     * @type {number}
     */
    width: number;

    /**
     * The height of the button's rect.
     * @type {number}
     */
    height: number;

    /**
     * Create the button elements.
     * @return {!Element} The button's SVG group.
     */
    createDom(): Element;

    /**
     * Correctly position the flyout button and make it visible.
     */
    show(): void;

    /**
     * Update svg attributes to match internal state.
     * @private
     */
    updateTransform_(): void;

    /**
     * Move the button to the given x, y coordinates.
     * @param {number} x The new x coordinate.
     * @param {number} y The new y coordinate.
     */
    moveTo(x: number, y: number): void;

    /**
     * Dispose of this button.
     */
    dispose(): void;

    /**
     * Do something when the button is clicked.
     * @param {!Event} e Mouse up event.
     */
    onMouseUp(e: Event): void;
  }

}
declare module Blockly {

  class Flyout extends Flyout__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Flyout__Class  {

    /**
     * Class for a flyout.
     * @param {!Object} workspaceOptions Dictionary of options for the workspace.
     * @constructor
     */
    constructor(workspaceOptions: Object);

    /**
     * @type {!Blockly.Workspace}
     * @private
     */
    workspace_: Blockly.Workspace;

    /**
     * Is RTL vs LTR.
     * @type {boolean}
     */
    RTL: boolean;

    /**
     * Flyout should be laid out horizontally vs vertically.
     * @type {boolean}
     * @private
     */
    horizontalLayout_: boolean;

    /**
     * Position of the toolbox and flyout relative to the workspace.
     * @type {number}
     * @private
     */
    toolboxPosition_: number;

    /**
     * Opaque data that can be passed to Blockly.unbindEvent_.
     * @type {!Array.<!Array>}
     * @private
     */
    eventWrappers_: any[][];

    /**
     * List of background buttons that lurk behind each block to catch clicks
     * landing in the blocks' lakes and bays.
     * @type {!Array.<!Element>}
     * @private
     */
    backgroundButtons_: Element[];

    /**
     * List of visible buttons.
     * @type {!Array.<!Blockly.FlyoutButton>}
     * @private
     */
    buttons_: Blockly.FlyoutButton[];

    /**
     * List of event listeners.
     * @type {!Array.<!Array>}
     * @private
     */
    listeners_: any[][];

    /**
     * List of blocks that should always be disabled.
     * @type {!Array.<!Blockly.Block>}
     * @private
     */
    permanentlyDisabled_: Blockly.Block[];

    /**
     * y coordinate of mousedown - used to calculate scroll distances.
     * @type {number}
     * @private
     */
    startDragMouseY_: number;

    /**
     * x coordinate of mousedown - used to calculate scroll distances.
     * @type {number}
     * @private
     */
    startDragMouseX_: number;

    /**
     * Does the flyout automatically close when a block is created?
     * @type {boolean}
     */
    autoClose: boolean;

    /**
     * Corner radius of the flyout background.
     * @type {number}
     * @const
     */
    CORNER_RADIUS: number;

    /**
     * Number of pixels the mouse must move before a drag/scroll starts. Because the
     * drag-intention is determined when this is reached, it is larger than
     * Blockly.DRAG_RADIUS so that the drag-direction is clearer.
     */
    DRAG_RADIUS: any /*missing*/;

    /**
     * Margin around the edges of the blocks in the flyout.
     * @type {number}
     * @const
     */
    MARGIN: number;

    /**
     * Gap between items in horizontal flyouts. Can be overridden with the "sep"
     * element.
     * @const {number}
     */
    GAP_X: any /*missing*/;

    /**
     * Gap between items in vertical flyouts. Can be overridden with the "sep"
     * element.
     * @const {number}
     */
    GAP_Y: any /*missing*/;

    /**
     * Top/bottom padding between scrollbar and edge of flyout background.
     * @type {number}
     * @const
     */
    SCROLLBAR_PADDING: number;

    /**
     * Width of flyout.
     * @type {number}
     * @private
     */
    width_: number;

    /**
     * Height of flyout.
     * @type {number}
     * @private
     */
    height_: number;

    /**
     * Is the flyout dragging (scrolling)?
     * DRAG_NONE - no drag is ongoing or state is undetermined.
     * DRAG_STICKY - still within the sticky drag radius.
     * DRAG_FREE - in scroll mode (never create a new block).
     * @private
     */
    dragMode_: any /*missing*/;

    /**
     * Range of a drag angle from a flyout considered "dragging toward workspace".
     * Drags that are within the bounds of this many degrees from the orthogonal
     * line to the flyout edge are considered to be "drags toward the workspace".
     * Example:
     * Flyout                                                  Edge   Workspace
     * [block] /  <-within this angle, drags "toward workspace" |
     * [block] ---- orthogonal to flyout boundary ----          |
     * [block] \                                                |
     * The angle is given in degrees from the orthogonal.
     *
     * This is used to know when to create a new block and when to scroll the
     * flyout. Setting it to 360 means that all drags create a new block.
     * @type {number}
     * @private
     */
    dragAngleRange_: number;

    /**
     * Creates the flyout's DOM.  Only needs to be called once.
     * @return {!Element} The flyout's SVG group.
     */
    createDom(): Element;

    /**
     * Initializes the flyout.
     * @param {!Blockly.Workspace} targetWorkspace The workspace in which to create
     *     new blocks.
     */
    init(targetWorkspace: Blockly.Workspace): void;

    /**
     * Dispose of this flyout.
     * Unlink from all DOM elements to prevent memory leaks.
     */
    dispose(): void;

    /**
     * Get the width of the flyout.
     * @return {number} The width of the flyout.
     */
    getWidth(): number;

    /**
     * Get the height of the flyout.
     * @return {number} The width of the flyout.
     */
    getHeight(): number;

    /**
     * Return an object with all the metrics required to size scrollbars for the
     * flyout.  The following properties are computed:
     * .viewHeight: Height of the visible rectangle,
     * .viewWidth: Width of the visible rectangle,
     * .contentHeight: Height of the contents,
     * .contentWidth: Width of the contents,
     * .viewTop: Offset of top edge of visible rectangle from parent,
     * .contentTop: Offset of the top-most content from the y=0 coordinate,
     * .absoluteTop: Top-edge of view.
     * .viewLeft: Offset of the left edge of visible rectangle from parent,
     * .contentLeft: Offset of the left-most content from the x=0 coordinate,
     * .absoluteLeft: Left-edge of view.
     * @return {Object} Contains size and position metrics of the flyout.
     * @private
     */
    getMetrics_(): Object;

    /**
     * Sets the translation of the flyout to match the scrollbars.
     * @param {!Object} xyRatio Contains a y property which is a float
     *     between 0 and 1 specifying the degree of scrolling and a
     *     similar x property.
     * @private
     */
    setMetrics_(xyRatio: Object): void;

    /**
     * Move the flyout to the edge of the workspace.
     */
    position(): void;

    /**
     * Create and set the path for the visible boundaries of the flyout.
     * @param {number} width The width of the flyout, not including the
     *     rounded corners.
     * @param {number} height The height of the flyout, not including
     *     rounded corners.
     * @private
     */
    setBackgroundPath_(width: number, height: number): void;

    /**
     * Create and set the path for the visible boundaries of the flyout in vertical
     * mode.
     * @param {number} width The width of the flyout, not including the
     *     rounded corners.
     * @param {number} height The height of the flyout, not including
     *     rounded corners.
     * @private
     */
    setBackgroundPathVertical_(width: number, height: number): void;

    /**
     * Create and set the path for the visible boundaries of the flyout in
     * horizontal mode.
     * @param {number} width The width of the flyout, not including the
     *     rounded corners.
     * @param {number} height The height of the flyout, not including
     *     rounded corners.
     * @private
     */
    setBackgroundPathHorizontal_(width: number, height: number): void;

    /**
     * Scroll the flyout to the top.
     */
    scrollToStart(): void;

    /**
     * Scroll the flyout.
     * @param {!Event} e Mouse wheel scroll event.
     * @private
     */
    wheel_(e: Event): void;

    /**
     * Is the flyout visible?
     * @return {boolean} True if visible.
     */
    isVisible(): boolean;

    /**
     * Hide and empty the flyout.
     */
    hide(): void;

    /**
     * Show and populate the flyout.
     * @param {!Array|string} xmlList List of blocks to show.
     *     Variables and procedures have a custom set of blocks.
     */
    show(xmlList: any[]|string): void;

    /**
     * Lay out the blocks in the flyout.
     * @param {!Array.<!Object>} contents The blocks and buttons to lay out.
     * @param {!Array.<number>} gaps The visible gaps between blocks.
     * @private
     */
    layout_(contents: Object[], gaps: number[]): void;

    /**
     * Delete blocks and background buttons from a previous showing of the flyout.
     * @private
     */
    clearOldBlocks_(): void;

    /**
     * Add listeners to a block that has been added to the flyout.
     * @param {!Element} root The root node of the SVG group the block is in.
     * @param {!Blockly.Block} block The block to add listeners for.
     * @param {!Element} rect The invisible rectangle under the block that acts as
     *     a button for that block.
     * @private
     */
    addBlockListeners_(root: Element, block: Blockly.Block, rect: Element): void;

    /**
     * Handle a mouse-down on an SVG block in a non-closing flyout.
     * @param {!Blockly.Block} block The flyout block to copy.
     * @return {!Function} Function to call when block is clicked.
     * @private
     */
    blockMouseDown_(block: Blockly.Block): Function;

    /**
     * Mouse down on the flyout background.  Start a vertical scroll drag.
     * @param {!Event} e Mouse down event.
     * @private
     */
    onMouseDown_(e: Event): void;

    /**
     * Handle a mouse-up anywhere in the SVG pane.  Is only registered when a
     * block is clicked.  We can't use mouseUp on the block since a fast-moving
     * cursor can briefly escape the block before it catches up.
     * @param {!Event} e Mouse up event.
     * @private
     */
    onMouseUp_(e: Event): void;

    /**
     * Handle a mouse-move to vertically drag the flyout.
     * @param {!Event} e Mouse move event.
     * @private
     */
    onMouseMove_(e: Event): void;

    /**
     * Mouse button is down on a block in a non-closing flyout.  Create the block
     * if the mouse moves beyond a small radius.  This allows one to play with
     * fields without instantiating blocks that instantly self-destruct.
     * @param {!Event} e Mouse move event.
     * @private
     */
    onMouseMoveBlock_(e: Event): void;

    /**
     * Determine the intention of a drag.
     * Updates dragMode_ based on a drag delta and the current mode,
     * and returns true if we should create a new block.
     * @param {number} dx X delta of the drag.
     * @param {number} dy Y delta of the drag.
     * @return {boolean} True if a new block should be created.
     * @private
     */
    determineDragIntention_(dx: number, dy: number): boolean;

    /**
     * Determine if a drag delta is toward the workspace, based on the position
     * and orientation of the flyout. This is used in determineDragIntention_ to
     * determine if a new block should be created or if the flyout should scroll.
     * @param {number} dx X delta of the drag.
     * @param {number} dy Y delta of the drag.
     * @return {boolean} true if the drag is toward the workspace.
     * @private
     */
    isDragTowardWorkspace_(dx: number, dy: number): boolean;

    /**
     * Create a copy of this block on the workspace.
     * @param {!Blockly.Block} originBlock The flyout block to copy.
     * @return {!Function} Function to call when block is clicked.
     * @private
     */
    createBlockFunc_(originBlock: Blockly.Block): Function;

    /**
     * Copy a block from the flyout to the workspace and position it correctly.
     * @param {!Blockly.Block} originBlock The flyout block to copy..
     * @return {!Blockly.Block} The new block in the main workspace.
     * @private
     */
    placeNewBlock_(originBlock: Blockly.Block): Blockly.Block;

    /**
     * Filter the blocks on the flyout to disable the ones that are above the
     * capacity limit.
     * @private
     */
    filterForCapacity_(): void;

    /**
     * Return the deletion rectangle for this flyout.
     * @return {goog.math.Rect} Rectangle in which to delete.
     */
    getClientRect(): goog.math.Rect;

    /**
     * Compute height of flyout.  Position button under each block.
     * For RTL: Lay out the blocks right-aligned.
     * @param {!Array<!Blockly.Block>} blocks The blocks to reflow.
     */
    reflowHorizontal(blocks: Blockly.Block[]): void;

    /**
     * Compute width of flyout.  Position button under each block.
     * For RTL: Lay out the blocks right-aligned.
     * @param {!Array<!Blockly.Block>} blocks The blocks to reflow.
     */
    reflowVertical(blocks: Blockly.Block[]): void;

    /**
     * Reflow blocks and their buttons.
     */
    reflow(): void;
  }

}
declare module Blockly {

  class Generator extends Generator__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Generator__Class  {

    /**
     * Class for a code generator that translates the blocks into a language.
     * @param {string} name Language name of this generator.
     * @constructor
     */
    constructor(name: string);

    /**
     * Arbitrary code to inject into locations that risk causing infinite loops.
     * Any instances of '%1' will be replaced by the block ID that failed.
     * E.g. '  checkTimeout(%1);\n'
     * @type {?string}
     */
    INFINITE_LOOP_TRAP: string;

    /**
     * Arbitrary code to inject before every statement.
     * Any instances of '%1' will be replaced by the block ID of the statement.
     * E.g. 'highlight(%1);\n'
     * @type {?string}
     */
    STATEMENT_PREFIX: string;

    /**
     * The method of indenting.  Defaults to two spaces, but language generators
     * may override this to increase indent or change to tabs.
     * @type {string}
     */
    INDENT: string;

    /**
     * Maximum length for a comment before wrapping.  Does not account for
     * indenting level.
     * @type {number}
     */
    COMMENT_WRAP: number;

    /**
     * List of outer-inner pairings that do NOT require parentheses.
     * @type {!Array.<!Array.<number>>}
     */
    ORDER_OVERRIDES: number[][];

    /**
     * Generate code for all blocks in the workspace to the specified language.
     * @param {Blockly.Workspace} workspace Workspace to generate code from.
     * @return {string} Generated code.
     */
    workspaceToCode(workspace: Blockly.Workspace): string;

    /**
     * Prepend a common prefix onto each line of code.
     * @param {string} text The lines of code.
     * @param {string} prefix The common prefix.
     * @return {string} The prefixed lines of code.
     */
    prefixLines(text: string, prefix: string): string;

    /**
     * Recursively spider a tree of blocks, returning all their comments.
     * @param {!Blockly.Block} block The block from which to start spidering.
     * @return {string} Concatenated list of comments.
     */
    allNestedComments(block: Blockly.Block): string;

    /**
     * Generate code for the specified block (and attached blocks).
     * @param {Blockly.Block} block The block to generate code for.
     * @return {string|!Array} For statement blocks, the generated code.
     *     For value blocks, an array containing the generated code and an
     *     operator order value.  Returns '' if block is null.
     */
    blockToCode(block: Blockly.Block): string|any[];

    /**
     * Generate code representing the specified value input.
     * @param {!Blockly.Block} block The block containing the input.
     * @param {string} name The name of the input.
     * @param {number} outerOrder The maximum binding strength (minimum order value)
     *     of any operators adjacent to "block".
     * @return {string} Generated code or '' if no blocks are connected or the
     *     specified input does not exist.
     */
    valueToCode(block: Blockly.Block, name: string, outerOrder: number): string;

    /**
     * Generate code representing the statement.  Indent the code.
     * @param {!Blockly.Block} block The block containing the input.
     * @param {string} name The name of the input.
     * @return {string} Generated code or '' if no blocks are connected.
     */
    statementToCode(block: Blockly.Block, name: string): string;

    /**
     * Add an infinite loop trap to the contents of a loop.
     * If loop is empty, add a statment prefix for the loop block.
     * @param {string} branch Code for loop contents.
     * @param {string} id ID of enclosing block.
     * @return {string} Loop contents, with infinite loop trap added.
     */
    addLoopTrap(branch: string, id: string): string;

    /**
     * Comma-separated list of reserved words.
     * @type {string}
     * @private
     */
    RESERVED_WORDS_: string;

    /**
     * Add one or more words to the list of reserved words for this language.
     * @param {string} words Comma-separated list of words to add to the list.
     *     No spaces.  Duplicates are ok.
     */
    addReservedWords(words: string): void;

    /**
     * This is used as a placeholder in functions defined using
     * Blockly.Generator.provideFunction_.  It must not be legal code that could
     * legitimately appear in a function definition (or comment), and it must
     * not confuse the regular expression parser.
     * @type {string}
     * @private
     */
    FUNCTION_NAME_PLACEHOLDER_: string;

    /**
     * Define a function to be included in the generated code.
     * The first time this is called with a given desiredName, the code is
     * saved and an actual name is generated.  Subsequent calls with the
     * same desiredName have no effect but have the same return value.
     *
     * It is up to the caller to make sure the same desiredName is not
     * used for different code values.
     *
     * The code gets output when Blockly.Generator.finish() is called.
     *
     * @param {string} desiredName The desired name of the function (e.g., isPrime).
     * @param {!Array.<string>} code A list of statements.  Use '  ' for indents.
     * @return {string} The actual name of the new function.  This may differ
     *     from desiredName if the former has already been taken by the user.
     * @private
     */
    provideFunction_(desiredName: string, code: string[]): string;
  }

}
declare module Blockly {

  class WorkspaceSvg extends WorkspaceSvg__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class WorkspaceSvg__Class extends Blockly.Workspace__Class  {

    /**
     * Class for a workspace.  This is an onscreen area with optional trashcan,
     * scrollbars, bubbles, and dragging.
     * @param {!Blockly.Options} options Dictionary of options.
     * @extends {Blockly.Workspace}
     * @constructor
     */
    constructor(options: Blockly.Options);

    /**
     * Database of pre-loaded sounds.
     * @private
     * @const
     */
    SOUNDS_: any /*missing*/;

    /**
     * A wrapper function called when a resize event occurs. You can pass the result to `unbindEvent_`.
     * @type {Array.<!Array>}
     */
    resizeHandlerWrapper_: any[][];

    /**
     * The render status of an SVG workspace.
     * Returns `true` for visible workspaces and `false` for non-visible, or headless, workspaces.
     * @type {boolean}
     */
    rendered: boolean;

    /**
     * Is this workspace the surface for a flyout?
     * @type {boolean}
     */
    isFlyout: boolean;

    /**
     * Is this workspace the surface for a mutator?
     * @type {boolean}
     * @package
     */
    isMutator: boolean;

    /**
     * Is this workspace currently being dragged around?
     * DRAG_NONE - No drag operation.
     * DRAG_BEGIN - Still inside the initial DRAG_RADIUS.
     * DRAG_FREE - Workspace has been dragged further than DRAG_RADIUS.
     * @private
     */
    dragMode_: any /*missing*/;

    /**
     * Current horizontal scrolling offset.
     * @type {number}
     */
    scrollX: number;

    /**
     * Current vertical scrolling offset.
     * @type {number}
     */
    scrollY: number;

    /**
     * Horizontal scroll value when scrolling started.
     * @type {number}
     */
    startScrollX: number;

    /**
     * Vertical scroll value when scrolling started.
     * @type {number}
     */
    startScrollY: number;

    /**
     * Distance from mouse to object being dragged.
     * @type {goog.math.Coordinate}
     * @private
     */
    dragDeltaXY_: goog.math.Coordinate;

    /**
     * Current scale.
     * @type {number}
     */
    scale: number;

    /** @type {Blockly.Trashcan} */
    trashcan: Blockly.Trashcan;

    /**
     * This workspace's scrollbars, if they exist.
     * @type {Blockly.ScrollbarPair}
     */
    scrollbar: Blockly.ScrollbarPair;

    /**
     * Time that the last sound was played.
     * @type {Date}
     * @private
     */
    lastSound_: Date;

    /**
     * Last known position of the page scroll.
     * This is used to determine whether we have recalculated screen coordinate
     * stuff since the page scrolled.
     * @type {!goog.math.Coordinate}
     * @private
     */
    lastRecordedPageScroll_: goog.math.Coordinate;

    /**
     * Inverted screen CTM, for use in mouseToSvg.
     * @type {SVGMatrix}
     * @private
     */
    inverseScreenCTM_: SVGMatrix;

    /**
     * Getter for the inverted screen CTM.
     * @return {SVGMatrix} The matrix to use in mouseToSvg
     */
    getInverseScreenCTM(): SVGMatrix;

    /**
     * Update the inverted screen CTM.
     */
    updateInverseScreenCTM(): void;

    /**
     * Save resize handler data so we can delete it later in dispose.
     * @param {!Array.<!Array>} handler Data that can be passed to unbindEvent_.
     */
    setResizeHandlerWrapper(handler: any[][]): void;

    /**
     * Create the workspace DOM elements.
     * @param {string=} opt_backgroundClass Either 'blocklyMainBackground' or
     *     'blocklyMutatorBackground'.
     * @return {!Element} The workspace's SVG group.
     */
    createDom(opt_backgroundClass?: string): Element;

    /**
     * <g class="blocklyWorkspace">
     *   <rect class="blocklyMainBackground" height="100%" width="100%"></rect>
     *   [Trashcan and/or flyout may go here]
     *   <g class="blocklyBlockCanvas"></g>
     *   <g class="blocklyBubbleCanvas"></g>
     *   [Scrollbars may go here]
     * </g>
     * @type {SVGElement}
     */
    svgGroup_: SVGElement;

    /** @type {SVGElement} */
    svgBackground_: SVGElement;

    /** @type {SVGElement} */
    svgBlockCanvas_: SVGElement;

    /** @type {SVGElement} */
    svgBubbleCanvas_: SVGElement;

    /**
     * Dispose of this workspace.
     * Unlink from all DOM elements to prevent memory leaks.
     */
    dispose(): void;

    /**
     * Obtain a newly created block.
     * @param {?string} prototypeName Name of the language object containing
     *     type-specific functions for this block.
     * @param {string=} opt_id Optional ID.  Use this ID if provided, otherwise
     *     create a new ID.
     * @return {!Blockly.BlockSvg} The created block.
     */
    newBlock(prototypeName: string, opt_id?: string): any;

    /**
     * Add a trashcan.
     * @param {number} bottom Distance from workspace bottom to bottom of trashcan.
     * @return {number} Distance from workspace bottom to the top of trashcan.
     * @private
     */
    addTrashcan_(bottom: number): number;

    /**
     * Add zoom controls.
     * @param {number} bottom Distance from workspace bottom to bottom of controls.
     * @return {number} Distance from workspace bottom to the top of controls.
     * @private
     */
    addZoomControls_(bottom: number): number;

    /** @type {Blockly.ZoomControls} */
    zoomControls_: any;

    /**
     * Add a flyout.
     * @private
     */
    addFlyout_(): void;

    /** @type {Blockly.Flyout} */
    flyout_: Blockly.Flyout;

    /**
     * Update items that use screen coordinate calculations
     * because something has changed (e.g. scroll position, window size).
     * @private
     */
    updateScreenCalculations_(): void;

    /**
     * Resize the parts of the workspace that change when the workspace
     * contents (e.g. block positions) change.  This will also scroll the
     * workspace contents if needed.
     * @package
     */
    resizeContents(): void;

    /**
     * Resize and reposition all of the workspace chrome (toolbox,
     * trash, scrollbars etc.)
     * This should be called when something changes that
     * requires recalculating dimensions and positions of the
     * trash, zoom, toolbox, etc. (e.g. window resize).
     */
    resize(): void;

    /**
     * Resizes and repositions workspace chrome if the page has a new
     * scroll position.
     * @package
     */
    updateScreenCalculationsIfScrolled(): void;

    /**
     * Get the SVG element that forms the drawing surface.
     * @return {!Element} SVG element.
     */
    getCanvas(): Element;

    /**
     * Get the SVG element that forms the bubble surface.
     * @return {!SVGGElement} SVG element.
     */
    getBubbleCanvas(): SVGGElement;

    /**
     * Get the SVG element that contains this workspace.
     * @return {!Element} SVG element.
     */
    getParentSvg(): Element;

    /**
     * Translate this workspace to new coordinates.
     * @param {number} x Horizontal translation.
     * @param {number} y Vertical translation.
     */
    translate(x: number, y: number): void;

    /**
     * Returns the horizontal offset of the workspace.
     * Intended for LTR/RTL compatibility in XML.
     * @return {number} Width.
     */
    getWidth(): number;

    /**
     * Toggles the visibility of the workspace.
     * Currently only intended for main workspace.
     * @param {boolean} isVisible True if workspace should be visible.
     */
    setVisible(isVisible: boolean): void;

    /**
     * Render all blocks in workspace.
     */
    render(): void;

    /**
     * Turn the visual trace functionality on or off.
     * @param {boolean} armed True if the trace should be on.
     */
    traceOn(armed: boolean): void;

    /**
     * Highlight a block in the workspace.
     * @param {?string} id ID of block to find.
     */
    highlightBlock(id: string): void;

    /**
     * Paste the provided block onto the workspace.
     * @param {!Element} xmlBlock XML block element.
     */
    paste(xmlBlock: Element): void;

    /**
     * Create a new variable with the given name.  Update the flyout to show the new
     *     variable immediately.
     * TODO: #468
     * @param {string} name The new variable's name.
     */
    createVariable(name: string): void;

    /**
     * Make a list of all the delete areas for this workspace.
     */
    recordDeleteAreas(): void;

    /**
     * Is the mouse event over a delete area (toolbox or non-closing flyout)?
     * Opens or closes the trashcan and sets the cursor as a side effect.
     * @param {!Event} e Mouse move event.
     * @return {boolean} True if event is in a delete area.
     */
    isDeleteArea(e: Event): boolean;

    /**
     * Handle a mouse-down on SVG drawing surface.
     * @param {!Event} e Mouse down event.
     * @private
     */
    onMouseDown_(e: Event): void;

    /**
     * Start tracking a drag of an object on this workspace.
     * @param {!Event} e Mouse down event.
     * @param {!goog.math.Coordinate} xy Starting location of object.
     */
    startDrag(e: Event, xy: goog.math.Coordinate): void;

    /**
     * Track a drag of an object on this workspace.
     * @param {!Event} e Mouse move event.
     * @return {!goog.math.Coordinate} New location of object.
     */
    moveDrag(e: Event): goog.math.Coordinate;

    /**
     * Is the user currently dragging a block or scrolling the flyout/workspace?
     * @return {boolean} True if currently dragging or scrolling.
     */
    isDragging(): boolean;

    /**
     * Handle a mouse-wheel on SVG drawing surface.
     * @param {!Event} e Mouse wheel event.
     * @private
     */
    onMouseWheel_(e: Event): void;

    /**
     * Calculate the bounding box for the blocks on the workspace.
     *
     * @return {Object} Contains the position and size of the bounding box
     *   containing the blocks on the workspace.
     */
    getBlocksBoundingBox(): Object;

    /**
     * Clean up the workspace by ordering all the blocks in a column.
     */
    cleanUp(): void;

    /**
     * Show the context menu for the workspace.
     * @param {!Event} e Mouse event.
     * @private
     */
    showContextMenu_(e: Event): void;

    /**
     * Load an audio file.  Cache it, ready for instantaneous playing.
     * @param {!Array.<string>} filenames List of file types in decreasing order of
     *   preference (i.e. increasing size).  E.g. ['media/go.mp3', 'media/go.wav']
     *   Filenames include path from Blockly's root.  File extensions matter.
     * @param {string} name Name of sound.
     * @private
     */
    loadAudio_(filenames: string[], name: string): void;

    /**
     * Preload all the audio files so that they play quickly when asked for.
     * @private
     */
    preloadAudio_(): void;

    /**
     * Play a named sound at specified volume.  If volume is not specified,
     * use full volume (1).
     * @param {string} name Name of sound.
     * @param {number=} opt_volume Volume of sound (0-1).
     */
    playAudio(name: string, opt_volume?: number): void;

    /**
     * Modify the block tree on the existing toolbox.
     * @param {Node|string} tree DOM tree of blocks, or text representation of same.
     */
    updateToolbox(tree: Node|string): void;

    /**
     * Mark this workspace as the currently focused main workspace.
     */
    markFocused(): void;

    /**
     * Zooming the blocks centered in (x, y) coordinate with zooming in or out.
     * @param {number} x X coordinate of center.
     * @param {number} y Y coordinate of center.
     * @param {number} type Type of zooming (-1 zooming out and 1 zooming in).
     */
    zoom(x: number, y: number, type: number): void;

    /**
     * Zooming the blocks centered in the center of view with zooming in or out.
     * @param {number} type Type of zooming (-1 zooming out and 1 zooming in).
     */
    zoomCenter(type: number): void;

    /**
     * Zoom the blocks to fit in the workspace if possible.
     */
    zoomToFit(): void;

    /**
     * Center the workspace.
     */
    scrollCenter(): void;

    /**
     * Set the workspace's zoom factor.
     * @param {number} newScale Zoom factor.
     */
    setScale(newScale: number): void;

    /**
     * Updates the grid pattern.
     * @private
     */
    updateGridPattern_(): void;
  }

}
declare module Blockly {

  class Warning extends Warning__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Warning__Class extends Blockly.Icon__Class  {

    /**
     * Class for a warning.
     * @param {!Blockly.Block} block The block associated with this warning.
     * @extends {Blockly.Icon}
     * @constructor
     */
    constructor(block: Blockly.Block);

    /**
     * Does this icon get hidden when the block is collapsed.
     */
    collapseHidden: any /*missing*/;

    /**
     * Draw the warning icon.
     * @param {!Element} group The icon group.
     * @private
     */
    drawIcon_(group: Element): void;

    /**
     * Show or hide the warning bubble.
     * @param {boolean} visible True if the bubble should be visible.
     */
    setVisible(visible: boolean): void;

    /**
     * Bring the warning to the top of the stack when clicked on.
     * @param {!Event} e Mouse up event.
     * @private
     */
    bodyFocus_(e: Event): void;

    /**
     * Set this warning's text.
     * @param {string} text Warning text (or '' to delete).
     * @param {string} id An ID for this text entry to be able to maintain
     *     multiple warnings.
     */
    setText(text: string, id: string): void;

    /**
     * Get this warning's texts.
     * @return {string} All texts concatenated into one string.
     */
    getText(): string;

    /**
     * Dispose of this warning.
     */
    dispose(): void;
  }

}
declare module Blockly {

  class Icon extends Icon__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Icon__Class  {

    /**
     * Class for an icon.
     * @param {Blockly.Block} block The block associated with this icon.
     * @constructor
     */
    constructor(block: Blockly.Block);

    /**
     * Does this icon get hidden when the block is collapsed.
     */
    collapseHidden: any /*missing*/;

    /**
     * Height and width of icons.
     */
    SIZE: any /*missing*/;

    /**
     * Bubble UI (if visible).
     * @type {Blockly.Bubble}
     * @private
     */
    bubble_: Blockly.Bubble;

    /**
     * Absolute coordinate of icon's center.
     * @type {goog.math.Coordinate}
     * @private
     */
    iconXY_: goog.math.Coordinate;

    /**
     * Create the icon on the block.
     */
    createIcon(): void;

    /**
     * Dispose of this icon.
     */
    dispose(): void;

    /**
     * Add or remove the UI indicating if this icon may be clicked or not.
     */
    updateEditable(): void;

    /**
     * Is the associated bubble visible?
     * @return {boolean} True if the bubble is visible.
     */
    isVisible(): boolean;

    /**
     * Clicking on the icon toggles if the bubble is visible.
     * @param {!Event} e Mouse click event.
     * @private
     */
    iconClick_(e: Event): void;

    /**
     * Change the colour of the associated bubble to match its block.
     */
    updateColour(): void;

    /**
     * Render the icon.
     * @param {number} cursorX Horizontal offset at which to position the icon.
     * @return {number} Horizontal offset for next item to draw.
     */
    renderIcon(cursorX: number): number;

    /**
     * Notification that the icon has moved.  Update the arrow accordingly.
     * @param {!goog.math.Coordinate} xy Absolute location.
     */
    setIconLocation(xy: goog.math.Coordinate): void;

    /**
     * Notification that the icon has moved, but we don't really know where.
     * Recompute the icon's location from scratch.
     */
    computeIconLocation(): void;

    /**
     * Returns the center of the block's icon relative to the surface.
     * @return {!goog.math.Coordinate} Object with x and y properties.
     */
    getIconLocation(): goog.math.Coordinate;
  }

}

declare module Blockly {

  /**
   * Inject a Blockly editor into the specified container element (usually a div).
   * @param {!Element|string} container Containing element, or its ID,
   *     or a CSS selector.
   * @param {Object=} opt_options Optional dictionary of options.
   * @return {!Blockly.Workspace} Newly created main workspace.
   */
  function inject(container: Element|string, opt_options?: Object): Blockly.Workspace;

  /**
   * Create the SVG image.
   * @param {!Element} container Containing element.
   * @param {!Blockly.Options} options Dictionary of options.
   * @return {!Element} Newly created SVG image.
   * @private
   */
  function createDom_(container: Element, options: Blockly.Options): Element;

  /**
   * Create a main workspace and add it to the SVG.
   * @param {!Element} svg SVG element with pattern defined.
   * @param {!Blockly.Options} options Dictionary of options.
   * @return {!Blockly.Workspace} Newly created main workspace.
   * @private
   */
  function createMainWorkspace_(svg: Element, options: Blockly.Options): Blockly.Workspace;

  /**
   * Initialize Blockly with various handlers.
   * @param {!Blockly.Workspace} mainWorkspace Newly created main workspace.
   * @private
   */
  function init_(mainWorkspace: Blockly.Workspace): void;

  /**
   * Modify the block tree on the existing toolbox.
   * @param {Node|string} tree DOM tree of blocks, or text representation of same.
   */
  function updateToolbox(tree: Node|string): void;
}
declare module Blockly {

  class RenderedConnection extends RenderedConnection__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class RenderedConnection__Class extends Blockly.Connection__Class  {

    /**
     * Class for a connection between blocks that may be rendered on screen.
     * @param {!Blockly.Block} source The block establishing this connection.
     * @param {number} type The type of the connection.
     * @extends {Blockly.Connection}
     * @constructor
     */
    constructor(source: Blockly.Block, type: number);

    /**
     * Returns the distance between this connection and another connection.
     * @param {!Blockly.Connection} otherConnection The other connection to measure
     *     the distance to.
     * @return {number} The distance between connections.
     */
    distanceFrom(otherConnection: Blockly.Connection): number;

    /**
     * Move the block(s) belonging to the connection to a point where they don't
     * visually interfere with the specified connection.
     * @param {!Blockly.Connection} staticConnection The connection to move away
     *     from.
     * @private
     */
    bumpAwayFrom_(staticConnection: Blockly.Connection): void;

    /**
     * Change the connection's coordinates.
     * @param {number} x New absolute x coordinate.
     * @param {number} y New absolute y coordinate.
     */
    moveTo(x: number, y: number): void;

    /**
     * Change the connection's coordinates.
     * @param {number} dx Change to x coordinate.
     * @param {number} dy Change to y coordinate.
     */
    moveBy(dx: number, dy: number): void;

    /**
     * Move this connection to the location given by its offset within the block and
     * the coordinate of the block's top left corner.
     * @param {!goog.math.Coordinate} blockTL The coordinate of the top left corner
     *     of the block.
     */
    moveToOffset(blockTL: goog.math.Coordinate): void;

    /**
     * Set the offset of this connection relative to the top left of its block.
     * @param {number} x The new relative x.
     * @param {number} y The new relative y.
     */
    setOffsetInBlock(x: number, y: number): void;

    /**
     * Move the blocks on either side of this connection right next to each other.
     * @private
     */
    tighten_(): void;

    /**
     * Find the closest compatible connection to this connection.
     * @param {number} maxLimit The maximum radius to another connection.
     * @param {number} dx Horizontal offset between this connection's location
     *     in the database and the current location (as a result of dragging).
     * @param {number} dy Vertical offset between this connection's location
     *     in the database and the current location (as a result of dragging).
     * @return {!{connection: ?Blockly.Connection, radius: number}} Contains two
     *     properties: 'connection' which is either another connection or null,
     *     and 'radius' which is the distance.
     */
    closest(maxLimit: number, dx: number, dy: number): { connection: Blockly.Connection; radius: number };

    /**
     * Add highlighting around this connection.
     */
    highlight(): void;

    /**
     * Unhide this connection, as well as all down-stream connections on any block
     * attached to this connection.  This happens when a block is expanded.
     * Also unhides down-stream comments.
     * @return {!Array.<!Blockly.Block>} List of blocks to render.
     */
    unhideAll(): Blockly.Block[];

    /**
     * Remove the highlighting around this connection.
     */
    unhighlight(): void;

    /**
     * Set whether this connections is hidden (not tracked in a database) or not.
     * @param {boolean} hidden True if connection is hidden.
     */
    setHidden(hidden: boolean): void;

    /**
     * Hide this connection, as well as all down-stream connections on any block
     * attached to this connection.  This happens when a block is collapsed.
     * Also hides down-stream comments.
     */
    hideAll(): void;

    /**
     * Check if the two connections can be dragged to connect to each other.
     * @param {!Blockly.Connection} candidate A nearby connection to check.
     * @param {number} maxRadius The maximum radius allowed for connections.
     * @return {boolean} True if the connection is allowed, false otherwise.
     */
    isConnectionAllowed(candidate: Blockly.Connection, maxRadius?: number): boolean;

    /**
     * Disconnect two blocks that are connected by this connection.
     * @param {!Blockly.Block} parentBlock The superior block.
     * @param {!Blockly.Block} childBlock The inferior block.
     * @private
     */
    disconnectInternal_(parentBlock: Blockly.Block, childBlock: Blockly.Block): void;

    /**
     * Respawn the shadow block if there was one connected to the this connection.
     * Render/rerender blocks as needed.
     * @private
     */
    respawnShadow_(): void;

    /**
     * Find all nearby compatible connections to this connection.
     * Type checking does not apply, since this function is used for bumping.
     * @param {number} maxLimit The maximum radius to another connection.
     * @return {!Array.<!Blockly.Connection>} List of connections.
     * @private
     */
    neighbours_(maxLimit: number): Blockly.Connection[];

    /**
     * Connect two connections together.  This is the connection on the superior
     * block.  Rerender blocks as needed.
     * @param {!Blockly.Connection} childConnection Connection on inferior block.
     * @private
     */
    connect_(childConnection: Blockly.Connection): void;
  }

}

declare module Blockly {

  class ScrollbarPair extends ScrollbarPair__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class ScrollbarPair__Class  {

    /**
     * Class for a pair of scrollbars.  Horizontal and vertical.
     * @param {!Blockly.Workspace} workspace Workspace to bind the scrollbars to.
     * @constructor
     */
    constructor(workspace: Blockly.Workspace);

    /**
     * Previously recorded metrics from the workspace.
     * @type {Object}
     * @private
     */
    oldHostMetrics_: Object;

    /**
     * Dispose of this pair of scrollbars.
     * Unlink from all DOM elements to prevent memory leaks.
     */
    dispose(): void;

    /**
     * Recalculate both of the scrollbars' locations and lengths.
     * Also reposition the corner rectangle.
     */
    resize(): void;

    /**
     * Set the sliders of both scrollbars to be at a certain position.
     * @param {number} x Horizontal scroll value.
     * @param {number} y Vertical scroll value.
     */
    set(x: number, y: number): void;

    /**
     * Helper to calculate the ratio of handle position to scrollbar view size.
     * @param {number} handlePosition The value of the handle.
     * @param {number} viewSize The total size of the scrollbar's view.
     * @return {number} Ratio.
     * @private
     */
    getRatio_(handlePosition: number, viewSize: number): number;
  }


  class Scrollbar extends Scrollbar__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Scrollbar__Class  {

    /**
     * Class for a pure SVG scrollbar.
     * This technique offers a scrollbar that is guaranteed to work, but may not
     * look or behave like the system's scrollbars.
     * @param {!Blockly.Workspace} workspace Workspace to bind the scrollbar to.
     * @param {boolean} horizontal True if horizontal, false if vertical.
     * @param {boolean=} opt_pair True if scrollbar is part of a horiz/vert pair.
     * @constructor
     */
    constructor(workspace: Blockly.Workspace, horizontal: boolean, opt_pair?: boolean);

    /**
     * The upper left corner of the scrollbar's svg group.
     * @type {goog.math.Coordinate}
     * @private
     */
    position_: goog.math.Coordinate;

    /**
     * The size of the area within which the scrollbar handle can move.
     * @type {number}
     * @private
     */
    scrollViewSize_: number;

    /**
     * The length of the scrollbar handle.
     * @type {number}
     * @private
     */
    handleLength_: number;

    /**
     * The offset of the start of the handle from the start of the scrollbar range.
     * @type {number}
     * @private
     */
    handlePosition_: number;

    /**
     * Whether the scrollbar handle is visible.
     * @type {boolean}
     * @private
     */
    isVisible_: boolean;

    /**
     * Dispose of this scrollbar.
     * Unlink from all DOM elements to prevent memory leaks.
     */
    dispose(): void;

    /**
     * Set the length of the scrollbar's handle and change the SVG attribute
     * accordingly.
     * @param {number} newLength The new scrollbar handle length.
     */
    setHandleLength_(newLength: number): void;

    /**
     * Set the offset of the scrollbar's handle and change the SVG attribute
     * accordingly.
     * @param {number} newPosition The new scrollbar handle offset.
     */
    setHandlePosition(newPosition: number): void;

    /**
     * Set the size of the scrollbar's background and change the SVG attribute
     * accordingly.
     * @param {number} newSize The new scrollbar background length.
     * @private
     */
    setScrollViewSize_(newSize: number): void;

    /**
     * Set the position of the scrollbar's svg group.
     * @param {number} x The new x coordinate.
     * @param {number} y The new y coordinate.
     */
    setPosition(x: number, y: number): void;

    /**
     * Recalculate the scrollbar's location and its length.
     * @param {Object=} opt_metrics A data structure of from the describing all the
     * required dimensions.  If not provided, it will be fetched from the host
     * object.
     */
    resize(opt_metrics?: Object): void;

    /**
     * Recalculate a horizontal scrollbar's location and length.
     * @param {!Object} hostMetrics A data structure describing all the
     *     required dimensions, possibly fetched from the host object.
     * @private
     */
    resizeHorizontal_(hostMetrics: Object): void;

    /**
     * Recalculate a horizontal scrollbar's location on the screen and path length.
     * This should be called when the layout or size of the window has changed.
     * @param {!Object} hostMetrics A data structure describing all the
     *     required dimensions, possibly fetched from the host object.
     */
    resizeViewHorizontal(hostMetrics: Object): void;

    /**
     * Recalculate a horizontal scrollbar's location within its path and length.
     * This should be called when the contents of the workspace have changed.
     * @param {!Object} hostMetrics A data structure describing all the
     *     required dimensions, possibly fetched from the host object.
     */
    resizeContentHorizontal(hostMetrics: Object): void;

    /**
     * Recalculate a vertical scrollbar's location and length.
     * @param {!Object} hostMetrics A data structure describing all the
     *     required dimensions, possibly fetched from the host object.
     * @private
     */
    resizeVertical_(hostMetrics: Object): void;

    /**
     * Recalculate a vertical scrollbar's location on the screen and path length.
     * This should be called when the layout or size of the window has changed.
     * @param {!Object} hostMetrics A data structure describing all the
     *     required dimensions, possibly fetched from the host object.
     */
    resizeViewVertical(hostMetrics: Object): void;

    /**
     * Recalculate a vertical scrollbar's location within its path and length.
     * This should be called when the contents of the workspace have changed.
     * @param {!Object} hostMetrics A data structure describing all the
     *     required dimensions, possibly fetched from the host object.
     */
    resizeContentVertical(hostMetrics: Object): void;

    /**
     * Create all the DOM elements required for a scrollbar.
     * The resulting widget is not sized.
     * @private
     */
    createDom_(): void;

    /**
     * Is the scrollbar visible.  Non-paired scrollbars disappear when they aren't
     * needed.
     * @return {boolean} True if visible.
     */
    isVisible(): boolean;

    /**
     * Set whether the scrollbar is visible.
     * Only applies to non-paired scrollbars.
     * @param {boolean} visible True if visible.
     */
    setVisible(visible: boolean): void;

    /**
     * Scroll by one pageful.
     * Called when scrollbar background is clicked.
     * @param {!Event} e Mouse down event.
     * @private
     */
    onMouseDownBar_(e: Event): void;

    /**
     * Start a dragging operation.
     * Called when scrollbar handle is clicked.
     * @param {!Event} e Mouse down event.
     * @private
     */
    onMouseDownHandle_(e: Event): void;

    /**
     * Drag the scrollbar's handle.
     * @param {!Event} e Mouse up event.
     * @private
     */
    onMouseMoveHandle_(e: Event): void;

    /**
     * Release the scrollbar handle and reset state accordingly.
     * @private
     */
    onMouseUpHandle_(): void;

    /**
     * Hide chaff and stop binding to mouseup and mousemove events.  Call this to
     * wrap up lose ends associated with the scrollbar.
     * @private
     */
    cleanUp_(): void;

    /**
     * Constrain the handle's position within the minimum (0) and maximum
     * (length of scrollbar) values allowed for the scrollbar.
     * @param {number} value Value that is potentially out of bounds.
     * @return {number} Constrained value.
     * @private
     */
    constrainHandle_(value: number): number;

    /**
     * Called when scrollbar is moved.
     * @private
     */
    onScroll_(): void;

    /**
     * Set the scrollbar slider's position.
     * @param {number} value The distance from the top/left end of the bar.
     */
    set(value: number): void;
  }

}
declare module Blockly {

  class Workspace extends Workspace__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Workspace__Class  {

    /**
     * Class for a workspace.  This is a data structure that contains blocks.
     * There is no UI, and can be created headlessly.
     * @param {Blockly.Options} opt_options Dictionary of options.
     * @constructor
     */
    constructor(opt_options?: Blockly.Options);

    /** @type {string} */
    id: string;

    /** @type {!Blockly.Options} */
    options: Blockly.Options;

    /** @type {boolean} */
    RTL: boolean;

    /** @type {boolean} */
    horizontalLayout: boolean;

    /** @type {number} */
    toolboxPosition: number;

    /**
     * @type {!Array.<!Blockly.Block>}
     * @private
     */
    topBlocks_: Blockly.Block[];

    /**
     * @type {!Array.<!Function>}
     * @private
     */
    listeners_: Function[];

    /**
     * @type {!Array.<!Blockly.Events.Abstract>}
     * @private
     */
    undoStack_: Blockly.Events.Abstract[];

    /**
     * @type {!Array.<!Blockly.Events.Abstract>}
     * @private
     */
    redoStack_: Blockly.Events.Abstract[];

    /**
     * @type {!Object}
     * @private
     */
    blockDB_: Object;

    /**
     * Returns `true` if the workspace is visible and `false` if it's headless.
     * @type {boolean}
     */
    rendered: boolean;

    /**
     * Maximum number of undo events in stack. `0` turns off undo, `Infinity` sets it to unlimited.
     * @type {number}
     */
    MAX_UNDO: number;

    /**
     * Dispose of this workspace.
     * Unlink from all DOM elements to prevent memory leaks.
     */
    dispose(): void;

    /**
     * Add a block to the list of top blocks.
     * @param {!Blockly.Block} block Block to remove.
     */
    addTopBlock(block: Blockly.Block): void;

    /**
     * Remove a block from the list of top blocks.
     * @param {!Blockly.Block} block Block to remove.
     */
    removeTopBlock(block: Blockly.Block): void;

    /**
     * Finds the top-level blocks and returns them.  Blocks are optionally sorted
     * by position; top to bottom (with slight LTR or RTL bias).
     * @param {boolean} ordered Sort the list if true.
     * @return {!Array.<!Blockly.Block>} The top-level block objects.
     */
    getTopBlocks(ordered: boolean): Blockly.Block[];

    /**
     * Find all blocks in workspace.  No particular order.
     * @return {!Array.<!Blockly.Block>} Array of blocks.
     */
    getAllBlocks(): Blockly.Block[];

    /**
     * Dispose of all blocks in workspace.
     */
    clear(): void;

    /**
     * Walk the workspace and update the list of variables to only contain ones in
     * use on the workspace.  Use when loading new workspaces from disk.
     * @param {boolean} clearList True if the old variable list should be cleared.
     */
    updateVariableList(clearList: boolean): void;

    /**
     * Rename a variable by updating its name in the variable list.
     * TODO: #468
     * @param {string} oldName Variable to rename.
     * @param {string} newName New variable name.
     */
    renameVariable(oldName: string, newName: string): void;

    /**
     * Create a variable with the given name.
     * TODO: #468
     * @param {string} name The new variable's name.
     */
    createVariable(name: string): void;

    /**
     * Find all the uses of a named variable.
     * @param {string} name Name of variable.
     * @return {!Array.<!Blockly.Block>} Array of block usages.
     */
    getVariableUses(name: string): Blockly.Block[];

    /**
     * Delete a variables and all of its uses from this workspace.
     * @param {string} name Name of variable to delete.
     */
    deleteVariable(name: string): void;

    /**
     * Check whether a variable exists with the given name.  The check is
     * case-insensitive.
     * @param {string} name The name to check for.
     * @return {number} The index of the name in the variable list, or -1 if it is
     *     not present.
     */
    variableIndexOf(name: string): number;

    /**
     * Returns the horizontal offset of the workspace.
     * Intended for LTR/RTL compatibility in XML.
     * Not relevant for a headless workspace.
     * @return {number} Width.
     */
    getWidth(): number;

    /**
     * Obtain a newly created block.
     * @param {?string} prototypeName Name of the language object containing
     *     type-specific functions for this block.
     * @param {string=} opt_id Optional ID.  Use this ID if provided, otherwise
     *     create a new id.
     * @return {!Blockly.Block} The created block.
     */
    newBlock(prototypeName: string, opt_id?: string): any;

    /**
     * The number of blocks that may be added to the workspace before reaching
     *     the maxBlocks.
     * @return {number} Number of blocks left.
     */
    remainingCapacity(): number;

    /**
     * Undo or redo the previous action.
     * @param {boolean} redo False if undo, true if redo.
     */
    undo(redo: boolean): void;

    /**
     * Clear the undo/redo stacks.
     */
    clearUndo(): void;

    /**
     * When something in this workspace changes, call a function.
     * @param {!Function} func Function to call.
     * @return {!Function} Function that can be passed to
     *     removeChangeListener.
     */
    addChangeListener(func: Function): Function;

    /**
     * Stop listening for this workspace's changes.
     * @param {Function} func Function to stop calling.
     */
    removeChangeListener(func: Function): void;

    /**
     * Fire a change event.
     * @param {!Blockly.Events.Abstract} event Event to fire.
     */
    fireChangeListener(event: Blockly.Events.Abstract): void;

    /**
     * Find the block on this workspace with the specified ID.
     * @param {string} id ID of block to find.
     * @return {Blockly.Block} The sought after block or null if not found.
     */
    getBlockById(id: string): Blockly.Block;
  }

}
declare module Blockly {

  class Toolbox extends Toolbox__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Toolbox__Class  {

    /**
     * Class for a Toolbox.
     * Creates the toolbox's DOM.
     * @param {!Blockly.Workspace} workspace The workspace in which to create new
     *     blocks.
     * @constructor
     */
    constructor(workspace: Blockly.Workspace);

    /**
     * @type {!Blockly.Workspace}
     * @private
     */
    workspace_: Blockly.Workspace;

    /**
     * Is RTL vs LTR.
     * @type {boolean}
     */
    RTL: boolean;

    /**
     * Whether the toolbox should be laid out horizontally.
     * @type {boolean}
     * @private
     */
    horizontalLayout_: boolean;

    /**
     * Position of the toolbox and flyout relative to the workspace.
     * @type {number}
     */
    toolboxPosition: number;

    /**
     * Configuration constants for Closure's tree UI.
     * @type {Object.<string,*>}
     * @private
     */
    config_: { [key: string]: any };

    /**
     * Configuration constants for tree separator.
     * @type {Object.<string,*>}
     * @private
     */
    treeSeparatorConfig_: { [key: string]: any };

    /**
     * Width of the toolbox, which changes only in vertical layout.
     * @type {number}
     */
    width: number;

    /**
     * Height of the toolbox, which changes only in horizontal layout.
     * @type {number}
     */
    height: number;

    /**
     * The SVG group currently selected.
     * @type {SVGGElement}
     * @private
     */
    selectedOption_: SVGGElement;

    /**
     * The tree node most recently selected.
     * @type {goog.ui.tree.BaseNode}
     * @private
     */
    lastCategory_: goog.ui.tree.BaseNode;

    /**
     * Initializes the toolbox.
     */
    init(): void;

    /**
     * @type {!Blockly.Flyout}
     * @private
     */
    flyout_: Blockly.Flyout;

    /**
     * Dispose of this toolbox.
     */
    dispose(): void;

    /**
     * Get the width of the toolbox.
     * @return {number} The width of the toolbox.
     */
    getWidth(): number;

    /**
     * Get the height of the toolbox.
     * @return {number} The width of the toolbox.
     */
    getHeight(): number;

    /**
     * Move the toolbox to the edge.
     */
    position(): void;

    /**
     * Fill the toolbox with categories and blocks.
     * @param {!Node} newTree DOM tree of blocks.
     * @return {Node} Tree node to open at startup (or null).
     * @private
     */
    populate_(newTree: Node): Node;

    /**
     * Sync trees of the toolbox.
     * @param {!Node} treeIn DOM tree of blocks.
     * @param {!Blockly.Toolbox.TreeControl} treeOut
     * @param {string} pathToMedia
     * @return {Node} Tree node to open at startup (or null).
     * @private
     */
    syncTrees_(treeIn: Node, treeOut: Blockly.Toolbox.TreeControl, pathToMedia: string): Node;

    /**
     * Recursively add colours to this toolbox.
     * @param {Blockly.Toolbox.TreeNode} opt_tree Starting point of tree.
     *     Defaults to the root node.
     * @private
     */
    addColour_(opt_tree: Blockly.Toolbox.TreeNode): void;

    /**
     * Unhighlight any previously specified option.
     */
    clearSelection(): void;

    /**
     * Return the deletion rectangle for this toolbox.
     * @return {goog.math.Rect} Rectangle in which to delete.
     */
    getClientRect(): goog.math.Rect;

    /**
     * Update the flyout's contents without closing it.  Should be used in response
     * to a change in one of the dynamic categories, such as variables or
     * procedures.
     */
    refreshSelection(): void;
  }

}
declare module Blockly {

  class Options extends Options__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Options__Class  {

    /**
     * Parse the user-specified options, using reasonable defaults where behaviour
     * is unspecified.
     * @param {!Object} options Dictionary of options.  Specification:
     *   https://developers.google.com/blockly/guides/get-started/web#configuration
     * @constructor
     */
    constructor(options: Object);

    /**
     * The parent of the current workspace, or null if there is no parent workspace.
     * @type {Blockly.Workspace}
     **/
    parentWorkspace: Blockly.Workspace;

    /**
     * If set, sets the translation of the workspace to match the scrollbars.
     */
    setMetrics: any /*missing*/;

    /**
     * Return an object with the metrics required to size the workspace.
     * @return {Object} Contains size and position metrics, or null.
     */
    getMetrics(): Object;
  }

}
declare module Blockly {

  class Names extends Names__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Names__Class  {

    /**
     * Class for a database of entity names (variables, functions, etc).
     * @param {string} reservedWords A comma-separated string of words that are
     *     illegal for use as names in a language (e.g. 'new,if,this,...').
     * @param {string=} opt_variablePrefix Some languages need a '$' or a namespace
     *     before all variable names.
     * @constructor
     */
    constructor(reservedWords: string, opt_variablePrefix?: string);

    /**
     * Empty the database and start from scratch.  The reserved words are kept.
     */
    reset(): void;

    /**
     * Convert a Blockly entity name to a legal exportable entity name.
     * @param {string} name The Blockly entity name (no constraints).
     * @param {string} type The type of entity in Blockly
     *     ('VARIABLE', 'PROCEDURE', 'BUILTIN', etc...).
     * @return {string} An entity name legal for the exported language.
     */
    getName(name: string, type: string): string;

    /**
     * Convert a Blockly entity name to a legal exportable entity name.
     * Ensure that this is a new name not overlapping any previously defined name.
     * Also check against list of reserved words for the current language and
     * ensure name doesn't collide.
     * @param {string} name The Blockly entity name (no constraints).
     * @param {string} type The type of entity in Blockly
     *     ('VARIABLE', 'PROCEDURE', 'BUILTIN', etc...).
     * @return {string} An entity name legal for the exported language.
     */
    getDistinctName(name: string, type: string): string;

    /**
     * Given a proposed entity name, generate a name that conforms to the
     * [_A-Za-z][_A-Za-z0-9]* format that most languages consider legal for
     * variables.
     * @param {string} name Potentially illegal entity name.
     * @return {string} Safe entity name.
     * @private
     */
    safeName_(name: string): string;
  }

}
declare module Blockly {

  class Mutator extends Mutator__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Mutator__Class extends Blockly.Icon__Class  {

    /**
     * Class for a mutator dialog.
     * @param {!Array.<string>} quarkNames List of names of sub-blocks for flyout.
     * @extends {Blockly.Icon}
     * @constructor
     */
    constructor(quarkNames: string[]);

    /**
     * Width of workspace.
     * @private
     */
    workspaceWidth_: any /*missing*/;

    /**
     * Height of workspace.
     * @private
     */
    workspaceHeight_: any /*missing*/;

    /**
     * Draw the mutator icon.
     * @param {!Element} group The icon group.
     * @private
     */
    drawIcon_(group: Element): void;

    /**
     * Create the editor for the mutator's bubble.
     * @return {!Element} The top-level node of the editor.
     * @private
     */
    createEditor_(): Element;

    /**
     * Add or remove the UI indicating if this icon may be clicked or not.
     */
    updateEditable(): void;

    /**
     * Callback function triggered when the bubble has resized.
     * Resize the workspace accordingly.
     * @private
     */
    resizeBubble_(): void;

    /**
     * Show or hide the mutator bubble.
     * @param {boolean} visible True if the bubble should be visible.
     */
    setVisible(visible: boolean): void;

    /**
     * Update the source block when the mutator's blocks are changed.
     * Bump down any block that's too high.
     * Fired whenever a change is made to the mutator's workspace.
     * @private
     */
    workspaceChanged_(): void;

    /**
     * Return an object with all the metrics required to size scrollbars for the
     * mutator flyout.  The following properties are computed:
     * .viewHeight: Height of the visible rectangle,
     * .viewWidth: Width of the visible rectangle,
     * .absoluteTop: Top-edge of view.
     * .absoluteLeft: Left-edge of view.
     * @return {!Object} Contains size and position metrics of mutator dialog's
     *     workspace.
     * @private
     */
    getFlyoutMetrics_(): Object;

    /**
     * Dispose of this mutator.
     */
    dispose(): void;
  }

}



declare module Blockly.Block {

  /**
   * Obtain a newly created block.
   * @param {!Blockly.Workspace} workspace The block's workspace.
   * @param {?string} prototypeName Name of the language object containing
   *     type-specific functions for this block.
   * @return {!Blockly.Block} The created block.
   * @deprecated December 2015
   */
  function obtain(workspace: Blockly.Workspace, prototypeName: string): Blockly.Block;
}

declare module Blockly.BlockSvg {

  /**
   * Horizontal space between elements.
   * @const
   */
  var SEP_SPACE_X: any /*missing*/;

  /**
   * Vertical space between elements.
   * @const
   */
  var SEP_SPACE_Y: any /*missing*/;

  /**
   * Vertical padding around inline elements.
   * @const
   */
  var INLINE_PADDING_Y: any /*missing*/;

  /**
   * Minimum height of a block.
   * @const
   */
  var MIN_BLOCK_Y: any /*missing*/;

  /**
   * Height of horizontal puzzle tab.
   * @const
   */
  var TAB_HEIGHT: any /*missing*/;

  /**
   * Width of horizontal puzzle tab.
   * @const
   */
  var TAB_WIDTH: any /*missing*/;

  /**
   * Width of vertical tab (inc left margin).
   * @const
   */
  var NOTCH_WIDTH: any /*missing*/;

  /**
   * Rounded corner radius.
   * @const
   */
  var CORNER_RADIUS: any /*missing*/;

  /**
   * Do blocks with no previous or output connections have a 'hat' on top?
   * @const
   */
  var START_HAT: any /*missing*/;

  /**
   * Height of the top hat.
   * @const
   */
  var START_HAT_HEIGHT: any /*missing*/;

  /**
   * Path of the top hat's curve.
   * @const
   */
  var START_HAT_PATH: any /*missing*/;

  /**
   * Path of the top hat's curve's highlight in LTR.
   * @const
   */
  var START_HAT_HIGHLIGHT_LTR: any /*missing*/;

  /**
   * Path of the top hat's curve's highlight in RTL.
   * @const
   */
  var START_HAT_HIGHLIGHT_RTL: any /*missing*/;

  /**
   * Distance from shape edge to intersect with a curved corner at 45 degrees.
   * Applies to highlighting on around the inside of a curve.
   * @const
   */
  var DISTANCE_45_INSIDE: any /*missing*/;

  /**
   * Distance from shape edge to intersect with a curved corner at 45 degrees.
   * Applies to highlighting on around the outside of a curve.
   * @const
   */
  var DISTANCE_45_OUTSIDE: any /*missing*/;

  /**
   * SVG path for drawing next/previous notch from left to right.
   * @const
   */
  var NOTCH_PATH_LEFT: any /*missing*/;

  /**
   * SVG path for drawing next/previous notch from left to right with
   * highlighting.
   * @const
   */
  var NOTCH_PATH_LEFT_HIGHLIGHT: any /*missing*/;

  /**
   * SVG path for drawing next/previous notch from right to left.
   * @const
   */
  var NOTCH_PATH_RIGHT: any /*missing*/;

  /**
   * SVG path for drawing jagged teeth at the end of collapsed blocks.
   * @const
   */
  var JAGGED_TEETH: any /*missing*/;

  /**
   * Height of SVG path for jagged teeth at the end of collapsed blocks.
   * @const
   */
  var JAGGED_TEETH_HEIGHT: any /*missing*/;

  /**
   * Width of SVG path for jagged teeth at the end of collapsed blocks.
   * @const
   */
  var JAGGED_TEETH_WIDTH: any /*missing*/;

  /**
   * SVG path for drawing a horizontal puzzle tab from top to bottom.
   * @const
   */
  var TAB_PATH_DOWN: any /*missing*/;

  /**
   * SVG path for drawing a horizontal puzzle tab from top to bottom with
   * highlighting from the upper-right.
   * @const
   */
  var TAB_PATH_DOWN_HIGHLIGHT_RTL: any /*missing*/;

  /**
   * SVG start point for drawing the top-left corner.
   * @const
   */
  var TOP_LEFT_CORNER_START: any /*missing*/;

  /**
   * SVG start point for drawing the top-left corner's highlight in RTL.
   * @const
   */
  var TOP_LEFT_CORNER_START_HIGHLIGHT_RTL: any /*missing*/;

  /**
   * SVG start point for drawing the top-left corner's highlight in LTR.
   * @const
   */
  var TOP_LEFT_CORNER_START_HIGHLIGHT_LTR: any /*missing*/;

  /**
   * SVG path for drawing the rounded top-left corner.
   * @const
   */
  var TOP_LEFT_CORNER: any /*missing*/;

  /**
   * SVG path for drawing the highlight on the rounded top-left corner.
   * @const
   */
  var TOP_LEFT_CORNER_HIGHLIGHT: any /*missing*/;

  /**
   * SVG path for drawing the top-left corner of a statement input.
   * Includes the top notch, a horizontal space, and the rounded inside corner.
   * @const
   */
  var INNER_TOP_LEFT_CORNER: any /*missing*/;

  /**
   * SVG path for drawing the bottom-left corner of a statement input.
   * Includes the rounded inside corner.
   * @const
   */
  var INNER_BOTTOM_LEFT_CORNER: any /*missing*/;

  /**
   * SVG path for drawing highlight on the top-left corner of a statement
   * input in RTL.
   * @const
   */
  var INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL: any /*missing*/;

  /**
   * SVG path for drawing highlight on the bottom-left corner of a statement
   * input in RTL.
   * @const
   */
  var INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL: any /*missing*/;

  /**
   * SVG path for drawing highlight on the bottom-left corner of a statement
   * input in LTR.
   * @const
   */
  var INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR: any /*missing*/;
}

declare module Blockly.BlockSvg {

  /**
   * Constant for identifying rows that are to be rendered inline.
   * Don't collide with Blockly.INPUT_VALUE and friends.
   * @const
   */
  var INLINE: any /*missing*/;

  /**
   * Wrapper function called when a mouseUp occurs during a drag operation.
   * @type {Array.<!Array>}
   * @private
   */
  var onMouseUpWrapper_: any[][];

  /**
   * Wrapper function called when a mouseMove occurs during a drag operation.
   * @type {Array.<!Array>}
   * @private
   */
  var onMouseMoveWrapper_: any[][];

  /**
   * Stop binding to the global mouseup and mousemove events.
   * @package
   */
  function terminateDrag(): void;

  /**
   * Animate a cloned block and eventually dispose of it.
   * This is a class method, not an instace method since the original block has
   * been destroyed and is no longer accessible.
   * @param {!Element} clone SVG element to animate and dispose of.
   * @param {boolean} rtl True if RTL, false if LTR.
   * @param {!Date} start Date of animation's start.
   * @param {number} workspaceScale Scale of workspace.
   * @private
   */
  function disposeUiStep_(clone: Element, rtl: boolean, start: Date, workspaceScale: number): void;

  /**
   * Expand a ripple around a connection.
   * @param {!Element} ripple Element to animate.
   * @param {!Date} start Date of animation's start.
   * @param {number} workspaceScale Scale of workspace.
   * @private
   */
  function connectionUiStep_(ripple: Element, start: Date, workspaceScale: number): void;

  /**
   * Animate a brief wiggle of a disconnected block.
   * @param {!Element} group SVG element to animate.
   * @param {number} magnitude Maximum degrees skew (reversed for RTL).
   * @param {!Date} start Date of animation's start.
   * @private
   */
  function disconnectUiStep_(group: Element, magnitude: number, start: Date): void;

  /**
   * Stop the disconnect UI animation immediately.
   * @private
   */
  function disconnectUiStop_(): void;
}

declare module Blockly.BlockSvg.disconnectUiStop_ {

  /**
   * PID of disconnect UI animation.  There can only be one at a time.
   * @type {number}
   */
  var pid: number;

  /**
   * SVG group of wobbling block.  There can only be one at a time.
   * @type {Element}
   */
  var group: Element;
}

declare module Blockly.Bubble {

  /**
   * Width of the border around the bubble.
   */
  var BORDER_WIDTH: any /*missing*/;

  /**
   * Determines the thickness of the base of the arrow in relation to the size
   * of the bubble.  Higher numbers result in thinner arrows.
   */
  var ARROW_THICKNESS: any /*missing*/;

  /**
   * The number of degrees that the arrow bends counter-clockwise.
   */
  var ARROW_ANGLE: any /*missing*/;

  /**
   * The sharpness of the arrow's bend.  Higher numbers result in smoother arrows.
   */
  var ARROW_BEND: any /*missing*/;

  /**
   * Distance between arrow point and anchor point.
   */
  var ANCHOR_RADIUS: any /*missing*/;

  /**
   * Wrapper function called when a mouseUp occurs during a drag operation.
   * @type {Array.<!Array>}
   * @private
   */
  var onMouseUpWrapper_: any[][];

  /**
   * Wrapper function called when a mouseMove occurs during a drag operation.
   * @type {Array.<!Array>}
   * @private
   */
  var onMouseMoveWrapper_: any[][];

  /**
   * Stop binding to the global mouseup and mousemove events.
   * @private
   */
  function unbindDragEvents_(): void;
}

declare module Blockly.ConnectionDB {

  /**
   * Don't inherit the constructor from Array.
   * @type {!Function}
   */
  var constructor: Function;

  /**
   * Initialize a set of connection DBs for a specified workspace.
   * @param {!Blockly.Workspace} workspace The workspace this DB is for.
   */
  function init(workspace: Blockly.Workspace): void;
}

declare module Blockly.Connection {

  /**
   * Constants for checking whether two connections are compatible.
   */
  var CAN_CONNECT: any /*missing*/;

  /**
   * Update two connections to target each other.
   * @param {Blockly.Connection} first The first connection to update.
   * @param {Blockly.Connection} second The second conneciton to update.
   * @private
   */
  function connectReciprocally_(first: Blockly.Connection, second: Blockly.Connection): void;

  /**
   * Does the given block have one and only one connection point that will accept
   * an orphaned block?
   * @param {!Blockly.Block} block The superior block.
   * @param {!Blockly.Block} orphanBlock The inferior block.
   * @return {Blockly.Connection} The suitable connection point on 'block',
   *     or null.
   * @private
   */
  function singleConnection_(block: Blockly.Block, orphanBlock: Blockly.Block): Blockly.Connection;

  /**
   * Walks down a row a blocks, at each stage checking if there are any
   * connections that will accept the orphaned block.  If at any point there
   * are zero or multiple eligible connections, returns null.  Otherwise
   * returns the only input on the last block in the chain.
   * Terminates early for shadow blocks.
   * @param {!Blockly.Block} startBlock The block on which to start the search.
   * @param {!Blockly.Block} orphanBlock The block that is looking for a home.
   * @return {Blockly.Connection} The suitable connection point on the chain
   *    of blocks, or null.
   * @private
   */
  function lastConnectionInRow_(startBlock: Blockly.Block, orphanBlock: Blockly.Block): Blockly.Connection;
}

declare module Blockly.ContextMenu {

  /**
   * Which block is the context menu attached to?
   * @type {Blockly.Block}
   */
  var currentBlock: Blockly.Block;

  /**
   * Construct the menu based on the list of options and show the menu.
   * @param {!Event} e Mouse event.
   * @param {!Array.<!Object>} options Array of menu options.
   * @param {boolean} rtl True if RTL, false if LTR.
   */
  function show(e: Event, options: Object[], rtl: boolean): void;

  /**
   * Hide the context menu.
   */
  function hide(): void;

  /**
   * Create a callback function that creates and configures a block,
   *   then places the new block next to the original.
   * @param {!Blockly.Block} block Original block.
   * @param {!Element} xml XML representation of new block.
   * @return {!Function} Function that creates a block.
   */
  function callbackFactory(block: Blockly.Block, xml: Element): Function;
}

declare module Blockly.Css {

  /**
   * List of cursors.
   * @enum {string}
   */
  enum Cursor { OPEN, CLOSED, DELETE }

  /**
   * Current cursor (cached value).
   * @type {string}
   * @private
   */
  var currentCursor_: string;

  /**
   * Large stylesheet added by Blockly.Css.inject.
   * @type {Element}
   * @private
   */
  var styleSheet_: Element;

  /**
   * Path to media directory, with any trailing slash removed.
   * @type {string}
   * @private
   */
  var mediaPath_: string;

  /**
   * Inject the CSS into the DOM.  This is preferable over using a regular CSS
   * file since:
   * a) It loads synchronously and doesn't force a redraw later.
   * b) It speeds up loading by not blocking on a separate HTTP transfer.
   * c) The CSS content may be made dynamic depending on init options.
   * @param {boolean} hasCss If false, don't inject CSS
   *     (providing CSS becomes the document's responsibility).
   * @param {string} pathToMedia Path from page to the Blockly media directory.
   */
  function inject(hasCss: boolean, pathToMedia: string): void;

  /**
   * Set the cursor to be displayed when over something draggable.
   * @param {Blockly.Css.Cursor} cursor Enum.
   */
  function setCursor(cursor: Blockly.Css.Cursor): void;

  /**
   * Array making up the CSS content for Blockly.
   */
  var CONTENT: any /*missing*/;
}

declare module Blockly.Events {

  class Abstract extends Abstract__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Abstract__Class  {

    /**
     * Abstract class for an event.
     * @param {Blockly.Block} block The block.
     * @constructor
     */
    constructor(block: Blockly.Block);

    /**
     * Encode the event as JSON.
     * @return {!Object} JSON representation.
     */
    toJson(): Object;

    /**
     * Decode the JSON event.
     * @param {!Object} json JSON representation.
     */
    fromJson(json: Object): void;

    /**
     * Does this event record any change of state?
     * @return {boolean} True if null, false if something changed.
     */
    isNull(): boolean;

    /**
     * Run an event.
     * @param {boolean} forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
  }


  class Create extends Create__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Create__Class extends Blockly.Events.Abstract__Class  {

    /**
     * Class for a block creation event.
     * @param {Blockly.Block} block The created block.  Null for a blank event.
     * @extends {Blockly.Events.Abstract}
     * @constructor
     */
    constructor(block: Blockly.Block);

    /**
     * Type of this event.
     * @type {string}
     */
    type: string;

    /**
     * Encode the event as JSON.
     * @return {!Object} JSON representation.
     */
    toJson(): Object;

    /**
     * Decode the JSON event.
     * @param {!Object} json JSON representation.
     */
    fromJson(json: Object): void;

    /**
     * Run a creation event.
     * @param {boolean} forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
  }


  class Delete extends Delete__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Delete__Class extends Blockly.Events.Abstract__Class  {

    /**
     * Class for a block deletion event.
     * @param {Blockly.Block} block The deleted block.  Null for a blank event.
     * @extends {Blockly.Events.Abstract}
     * @constructor
     */
    constructor(block: Blockly.Block);

    /**
     * Type of this event.
     * @type {string}
     */
    type: string;

    /**
     * Encode the event as JSON.
     * @return {!Object} JSON representation.
     */
    toJson(): Object;

    /**
     * Decode the JSON event.
     * @param {!Object} json JSON representation.
     */
    fromJson(json: Object): void;

    /**
     * Run a deletion event.
     * @param {boolean} forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
  }


  class Change extends Change__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Change__Class extends Blockly.Events.Abstract__Class  {

    /**
     * Class for a block change event.
     * @param {Blockly.Block} block The changed block.  Null for a blank event.
     * @param {string} element One of 'field', 'comment', 'disabled', etc.
     * @param {?string} name Name of input or field affected, or null.
     * @param {string} oldValue Previous value of element.
     * @param {string} newValue New value of element.
     * @extends {Blockly.Events.Abstract}
     * @constructor
     */
    constructor(block: Blockly.Block, element: string, name: string, oldValue: string, newValue: string);

    /**
     * Type of this event.
     * @type {string}
     */
    type: string;

    /**
     * Encode the event as JSON.
     * @return {!Object} JSON representation.
     */
    toJson(): Object;

    /**
     * Decode the JSON event.
     * @param {!Object} json JSON representation.
     */
    fromJson(json: Object): void;

    /**
     * Does this event record any change of state?
     * @return {boolean} True if something changed.
     */
    isNull(): boolean;

    /**
     * Run a change event.
     * @param {boolean} forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
  }


  class Move extends Move__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Move__Class extends Blockly.Events.Abstract__Class  {

    /**
     * Class for a block move event.  Created before the move.
     * @param {Blockly.Block} block The moved block.  Null for a blank event.
     * @extends {Blockly.Events.Abstract}
     * @constructor
     */
    constructor(block: Blockly.Block);

    /**
     * Type of this event.
     * @type {string}
     */
    type: string;

    /**
     * Encode the event as JSON.
     * @return {!Object} JSON representation.
     */
    toJson(): Object;

    /**
     * Decode the JSON event.
     * @param {!Object} json JSON representation.
     */
    fromJson(json: Object): void;

    /**
     * Record the block's new location.  Called after the move.
     */
    recordNew(): void;

    /**
     * Returns the parentId and input if the block is connected,
     *   or the XY location if disconnected.
     * @return {!Object} Collection of location info.
     * @private
     */
    currentLocation_(): Object;

    /**
     * Does this event record any change of state?
     * @return {boolean} True if something changed.
     */
    isNull(): boolean;

    /**
     * Run a move event.
     * @param {boolean} forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
  }


  class Ui extends Ui__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class Ui__Class extends Blockly.Events.Abstract__Class  {

    /**
     * Class for a UI event.
     * @param {Blockly.Block} block The affected block.
     * @param {string} element One of 'selected', 'comment', 'mutator', etc.
     * @param {string} oldValue Previous value of element.
     * @param {string} newValue New value of element.
     * @extends {Blockly.Events.Abstract}
     * @constructor
     */
    constructor(block: Blockly.Block, element: string, oldValue: string, newValue: string);

    /**
     * Type of this event.
     * @type {string}
     */
    type: string;

    /**
     * Encode the event as JSON.
     * @return {!Object} JSON representation.
     */
    toJson(): Object;

    /**
     * Decode the JSON event.
     * @param {!Object} json JSON representation.
     */
    fromJson(json: Object): void;
  }


  /**
   * Group ID for new events.  Grouped events are indivisible.
   * @type {string}
   * @private
   */
  var group_: string;

  /**
   * Sets whether events should be added to the undo stack.
   * @type {boolean}
   */
  var recordUndo: boolean;

  /**
   * Allow change events to be created and fired.
   * @type {number}
   * @private
   */
  var disabled_: number;

  /**
   * Name of event that creates a block.
   * @const
   */
  var CREATE: any /*missing*/;

  /**
   * Name of event that deletes a block.
   * @const
   */
  var DELETE: any /*missing*/;

  /**
   * Name of event that changes a block.
   * @const
   */
  var CHANGE: any /*missing*/;

  /**
   * Name of event that moves a block.
   * @const
   */
  var MOVE: any /*missing*/;

  /**
   * Name of event that records a UI change.
   * @const
   */
  var UI: any /*missing*/;

  /**
   * List of events queued for firing.
   * @private
   */
  var FIRE_QUEUE_: any /*missing*/;

  /**
   * Create a custom event and fire it.
   * @param {!Blockly.Events.Abstract} event Custom data for event.
   */
  function fire(event: Blockly.Events.Abstract): void;

  /**
   * Fire all queued events.
   * @private
   */
  function fireNow_(): void;

  /**
   * Filter the queued events and merge duplicates.
   * @param {!Array.<!Blockly.Events.Abstract>} queueIn Array of events.
   * @param {boolean} forward True if forward (redo), false if backward (undo).
   * @return {!Array.<!Blockly.Events.Abstract>} Array of filtered events.
   */
  function filter(queueIn: Blockly.Events.Abstract[], forward: boolean): Blockly.Events.Abstract[];

  /**
   * Modify pending undo events so that when they are fired they don't land
   * in the undo stack.  Called by Blockly.Workspace.clearUndo.
   */
  function clearPendingUndo(): void;

  /**
   * Stop sending events.  Every call to this function MUST also call enable.
   */
  function disable(): void;

  /**
   * Start sending events.  Unless events were already disabled when the
   * corresponding call to disable was made.
   */
  function enable(): void;

  /**
   * Returns whether events may be fired or not.
   * @return {boolean} True if enabled.
   */
  function isEnabled(): boolean;

  /**
   * Current group.
   * @return {string} ID string.
   */
  function getGroup(): string;

  /**
   * Start or stop a group.
   * @param {boolean|string} state True to start new group, false to end group.
   *   String to set group explicitly.
   */
  function setGroup(state: boolean|string): void;

  /**
   * Compute a list of the IDs of the specified block and all its descendants.
   * @param {!Blockly.Block} block The root block.
   * @return {!Array.<string>} List of block IDs.
   * @private
   */
  function getDescendantIds_(block: Blockly.Block): string[];

  /**
   * Decode the JSON into an event.
   * @param {!Object} json JSON representation.
   * @param {!Blockly.Workspace} workspace Target workspace for event.
   * @return {!Blockly.Events.Abstract} The event represented by the JSON.
   */
  function fromJson(json: Object, workspace: Blockly.Workspace): Blockly.Events.Abstract;

  /**
   * Enable/disable a block depending on whether it is properly connected.
   * Use this on applications where all blocks should be connected to a top block.
   * Recommend setting the 'disable' option to 'false' in the config so that
   * users don't try to reenable disabled orphan blocks.
   * @param {!Blockly.Events.Abstract} event Custom data for event.
   */
  function disableOrphans(event: Blockly.Events.Abstract): void;
}

declare module Blockly.FieldAngle {

  /**
   * Round angles to the nearest 15 degrees when using mouse.
   * Set to 0 to disable rounding.
   */
  var ROUND: any /*missing*/;

  /**
   * Half the width of protractor image.
   */
  var HALF: any /*missing*/;

  /**
   * Angle increases clockwise (true) or counterclockwise (false).
   */
  var CLOCKWISE: any /*missing*/;

  /**
   * Offset the location of 0 degrees (and all angles) by a constant.
   * Usually either 0 (0 = right) or 90 (0 = up).
   */
  var OFFSET: any /*missing*/;

  /**
   * Maximum allowed angle before wrapping.
   * Usually either 360 (for 0 to 359.9) or 180 (for -179.9 to 180).
   */
  var WRAP: any /*missing*/;

  /**
   * Radius of protractor circle.  Slightly smaller than protractor size since
   * otherwise SVG crops off half the border at the edges.
   */
  var RADIUS: any /*missing*/;
}

declare module Blockly.FieldCheckbox {

  /**
   * Character for the checkmark.
   */
  var CHECK_CHAR: any /*missing*/;
}

declare module Blockly.FieldColour {

  /**
   * An array of colour strings for the palette.
   * See bottom of this page for the default:
   * http://docs.closure-library.googlecode.com/git/closure_goog_ui_colorpicker.js.source.html
   * @type {!Array.<string>}
   */
  var COLOURS: string[];

  /**
   * Number of columns in the palette.
   */
  var COLUMNS: any /*missing*/;

  /**
   * Hide the colour palette.
   * @private
   */
  function widgetDispose_(): void;
}

declare module Blockly.FieldDate {

  /**
   * Hide the date picker.
   * @private
   */
  function widgetDispose_(): void;

  /**
   * Load the best language pack by scanning the Blockly.Msg object for a
   * language that matches the available languages in Closure.
   * @private
   */
  function loadLanguage_(): void;

  /**
   * CSS for date picker.  See css.js for use.
   */
  var CSS: any /*missing*/;
}

declare module Blockly.FieldDropdown {

  /**
   * Horizontal distance that a checkmark ovehangs the dropdown.
   */
  var CHECKMARK_OVERHANG: any /*missing*/;

  /**
   * Android can't (in 2014) display "▾", so use "▼" instead.
   */
  var ARROW_CHAR: any /*missing*/;
}



declare module Blockly.Field {

  /**
   * Temporary cache of text widths.
   * @type {Object}
   * @private
   */
  var cacheWidths_: Object;

  /**
   * Number of current references to cache.
   * @type {number}
   * @private
   */
  var cacheReference_: number;

  /**
   * Non-breaking space.
   * @const
   */
  var NBSP: any /*missing*/;

  /**
   * Start caching field widths.  Every call to this function MUST also call
   * stopCache.  Caches must not survive between execution threads.
   */
  function startCache(): void;

  /**
   * Stop caching field widths.  Unless caching was already on when the
   * corresponding call to startCache was made.
   */
  function stopCache(): void;
}

declare module Blockly.FieldTextInput {

  /**
   * Point size of text.  Should match blocklyText's font-size in CSS.
   */
  var FONTSIZE: any /*missing*/;

  /** @type {!HTMLInputElement} */
  var htmlInput_: HTMLInputElement;

  /**
   * Ensure that only a number may be entered.
   * @param {string} text The user's text.
   * @return {?string} A string representing a valid number, or null if invalid.
   */
  function numberValidator(text: string): string;

  /**
   * Ensure that only a nonnegative integer may be entered.
   * @param {string} text The user's text.
   * @return {?string} A string representing a valid int, or null if invalid.
   */
  function nonnegativeIntegerValidator(text: string): string;
}



declare module Blockly.FieldVariable {

  /**
   * Return a sorted list of variable names for variable dropdown menus.
   * Include a special option at the end for creating a new variable name.
   * @return {!Array.<string>} Array of variable names.
   * @this {!Blockly.FieldVariable}
   */
  function dropdownCreate(): string[];
}



declare module Blockly.FlyoutButton {

  /**
   * The margin around the text in the button.
   */
  var MARGIN: any /*missing*/;
}



declare module Blockly.Flyout {

  /**
   * When a flyout drag is in progress, this is a reference to the flyout being
   * dragged. This is used by Flyout.terminateDrag_ to reset dragMode_.
   * @type {Blockly.Flyout}
   * @private
   */
  var startFlyout_: Blockly.Flyout;

  /**
   * Event that started a drag. Used to determine the drag distance/direction and
   * also passed to BlockSvg.onMouseDown_() after creating a new block.
   * @type {Event}
   * @private
   */
  var startDownEvent_: Event;

  /**
   * Flyout block where the drag/click was initiated. Used to fire click events or
   * create a new block.
   * @type {Event}
   * @private
   */
  var startBlock_: Event;

  /**
   * Wrapper function called when a mouseup occurs during a background or block
   * drag operation.
   * @type {Array.<!Array>}
   * @private
   */
  var onMouseUpWrapper_: any[][];

  /**
   * Wrapper function called when a mousemove occurs during a background drag.
   * @type {Array.<!Array>}
   * @private
   */
  var onMouseMoveWrapper_: any[][];

  /**
   * Wrapper function called when a mousemove occurs during a block drag.
   * @type {Array.<!Array>}
   * @private
   */
  var onMouseMoveBlockWrapper_: any[][];

  /**
   * Actions to take when a block in the flyout is right-clicked.
   * @param {!Event} e Event that triggered the right-click.  Could originate from
   *     a long-press in a touch environment.
   * @param {Blockly.BlockSvg} block The block that was clicked.
   */
  function blockRightClick_(e: Event, block: Blockly.BlockSvg): void;

  /**
   * Stop binding to the global mouseup and mousemove events.
   * @private
   */
  function terminateDrag_(): void;
}



declare module Blockly.Generator {

  /**
   * Category to separate generated function names from variables and procedures.
   */
  var NAME_TYPE: any /*missing*/;
}



declare module Blockly.inject {

  /**
   * Bind document events, but only once.  Destroying and reinjecting Blockly
   * should not bind again.
   * Bind events for scrolling the workspace.
   * Most of these events should be bound to the SVG's surface.
   * However, 'mouseup' has to be on the whole document so that a block dragged
   * out of bounds and released will know that it has been released.
   * Also, 'keydown' has to be on the whole document since the browser doesn't
   * understand a concept of focus on the SVG image.
   * @private
   */
  function bindDocumentEvents_(): void;

  /**
   * Load sounds for the given workspace.
   * @param {string} pathToMedia The path to the media directory.
   * @param {!Blockly.Workspace} workspace The workspace to load sounds for.
   * @private
   */
  function loadSounds_(pathToMedia: string, workspace: Blockly.Workspace): void;
}



declare module goog {

  /**
   * Back up original getMsg function.
   * @type {!Function}
   */
  var getMsgOrig: Function;

  /**
   * Gets a localized message.
   * Overrides the default Closure function to check for a Blockly.Msg first.
   * Used infrequently, only known case is TODAY button in date picker.
   * @param {string} str Translatable string, places holders in the form {$foo}.
   * @param {Object<string, string>=} opt_values Maps place holder name to value.
   * @return {string} message with placeholders filled.
   * @suppress {duplicate}
   */
  function getMsg(str: string, opt_values?: { [key: string]: string }): string;
}

declare module goog.getMsg {

  /**
   * Mapping of Closure messages to Blockly.Msg names.
   */
  var blocklyMsgMap: any /*missing*/;
}



declare module Blockly.Mutator {

  /**
   * Reconnect an block to a mutated input.
   * @param {Blockly.Connection} connectionChild Connection on child block.
   * @param {!Blockly.Block} block Parent block.
   * @param {string} inputName Name of input on parent block.
   * @return {boolean} True iff a reconnection was made, false otherwise.
   */
  function reconnect(connectionChild: Blockly.Connection, block: Blockly.Block, inputName: string): boolean;
}



declare module Blockly.Names {

  /**
   * Do the given two entity names refer to the same entity?
   * Blockly names are case-insensitive.
   * @param {string} name1 First name.
   * @param {string} name2 Second name.
   * @return {boolean} True if names are the same.
   */
  function equals(name1: string, name2: string): boolean;
}



declare module Blockly.Options {

  /**
   * Parse the user-specified zoom options, using reasonable defaults where
   * behaviour is unspecified.  See zoom documentation:
   *   https://developers.google.com/blockly/guides/configure/web/zoom
   * @param {!Object} options Dictionary of options.
   * @return {!Object} A dictionary of normalized options.
   * @private
   */
  function parseZoomOptions_(options: Object): Object;

  /**
   * Parse the user-specified grid options, using reasonable defaults where
   * behaviour is unspecified. See grid documentation:
   *   https://developers.google.com/blockly/guides/configure/web/grid
   * @param {!Object} options Dictionary of options.
   * @return {!Object} A dictionary of normalized options.
   * @private
   */
  function parseGridOptions_(options: Object): Object;

  /**
   * Parse the provided toolbox tree into a consistent DOM format.
   * @param {Node|string} tree DOM tree of blocks, or text representation of same.
   * @return {Node} DOM tree of blocks, or null.
   */
  function parseToolboxTree(tree: Node|string): Node;
}

declare module Blockly.Procedures {

  /**
   * Category to separate procedure names from variables and generated functions.
   */
  var NAME_TYPE: any /*missing*/;

  /**
   * Find all user-created procedure definitions in a workspace.
   * @param {!Blockly.Workspace} root Root workspace.
   * @return {!Array.<!Array.<!Array>>} Pair of arrays, the
   *     first contains procedures without return variables, the second with.
   *     Each procedure is defined by a three-element list of name, parameter
   *     list, and return value boolean.
   */
  function allProcedures(root: Blockly.Workspace): any[][][];

  /**
   * Comparison function for case-insensitive sorting of the first element of
   * a tuple.
   * @param {!Array} ta First tuple.
   * @param {!Array} tb Second tuple.
   * @return {number} -1, 0, or 1 to signify greater than, equality, or less than.
   * @private
   */
  function procTupleComparator_(ta: any[], tb: any[]): number;

  /**
   * Ensure two identically-named procedures don't exist.
   * @param {string} name Proposed procedure name.
   * @param {!Blockly.Block} block Block to disambiguate.
   * @return {string} Non-colliding name.
   */
  function findLegalName(name: string, block: Blockly.Block): string;

  /**
   * Does this procedure have a legal name?  Illegal names include names of
   * procedures already defined.
   * @param {string} name The questionable name.
   * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
   * @param {Blockly.Block=} opt_exclude Optional block to exclude from
   *     comparisons (one doesn't want to collide with oneself).
   * @return {boolean} True if the name is legal.
   * @private
   */
  function isLegalName_(name: string, workspace: Blockly.Workspace, opt_exclude?: Blockly.Block): boolean;

  /**
   * Rename a procedure.  Called by the editable field.
   * @param {string} name The proposed new name.
   * @return {string} The accepted name.
   * @this {!Blockly.Field}
   */
  function rename(name: string): string;

  /**
   * Construct the blocks required by the flyout for the procedure category.
   * @param {!Blockly.Workspace} workspace The workspace contianing procedures.
   * @return {!Array.<!Element>} Array of XML block elements.
   */
  function flyoutCategory(workspace: Blockly.Workspace): Element[];

  /**
   * Find all the callers of a named procedure.
   * @param {string} name Name of procedure.
   * @param {!Blockly.Workspace} workspace The workspace to find callers in.
   * @return {!Array.<!Blockly.Block>} Array of caller blocks.
   */
  function getCallers(name: string, workspace: Blockly.Workspace): Blockly.Block[];

  /**
   * When a procedure definition changes its parameters, find and edit all its
   * callers.
   * @param {!Blockly.Block} defBlock Procedure definition block.
   */
  function mutateCallers(defBlock: Blockly.Block): void;

  /**
   * Find the definition block for the named procedure.
   * @param {string} name Name of procedure.
   * @param {!Blockly.Workspace} workspace The workspace to search.
   * @return {Blockly.Block} The procedure definition block, or null not found.
   */
  function getDefinition(name: string, workspace: Blockly.Workspace): Blockly.Block;
}



declare module Blockly.Scrollbar {

  /**
   * Width of vertical scrollbar or height of horizontal scrollbar.
   * Increase the size of scrollbars on touch devices.
   * Don't define if there is no document object (e.g. node.js).
   */
  var scrollbarThickness: any /*missing*/;

  /**
   * @param {!Object} first An object containing computed measurements of a
   *    workspace.
   * @param {!Object} second Another object containing computed measurements of a
   *    workspace.
   * @return {boolean} Whether the two sets of metrics are equivalent.
   * @private
   */
  function metricsAreEquivalent_(first: Object, second: Object): boolean;

  /**
   * Insert a node after a reference node.
   * Contrast with node.insertBefore function.
   * @param {!Element} newNode New element to insert.
   * @param {!Element} refNode Existing element to precede new node.
   * @private
   */
  function insertAfter_(newNode: Element, refNode: Element): void;
}



declare module Blockly.Toolbox {

  class TreeControl extends TreeControl__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class TreeControl__Class extends goog.ui.tree.TreeControl  {

    /**
     * Extention of a TreeControl object that uses a custom tree node.
     * @param {Blockly.Toolbox} toolbox The parent toolbox for this tree.
     * @param {Object} config The configuration for the tree. See
     *    goog.ui.tree.TreeControl.DefaultConfig.
     * @constructor
     * @extends {goog.ui.tree.TreeControl}
     */
    constructor(toolbox: Blockly.Toolbox, config: Object);

    /**
     * Handles touch events.
     * @param {!goog.events.BrowserEvent} e The browser event.
     * @private
     */
    handleTouchEvent_(e: goog.events.BrowserEvent): void;
  }


  class TreeNode extends TreeNode__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class TreeNode__Class extends goog.ui.tree.TreeNode  {

    /**
     * A single node in the tree, customized for Blockly's UI.
     * @param {Blockly.Toolbox} toolbox The parent toolbox for this tree.
     * @param {!goog.html.SafeHtml} html The HTML content of the node label.
     * @param {Object=} opt_config The configuration for the tree. See
     *    goog.ui.tree.TreeControl.DefaultConfig. If not specified, a default config
     *    will be used.
     * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
     * @constructor
     * @extends {goog.ui.tree.TreeNode}
     */
    constructor(toolbox: Blockly.Toolbox, html: goog.html.SafeHtml, opt_config?: Object, opt_domHelper?: goog.dom.DomHelper);
  }


  class TreeSeparator extends TreeSeparator__Class { }
  /** Fake class which should be extended to avoid inheriting static properties */
  class TreeSeparator__Class extends Blockly.Toolbox.TreeNode__Class  {

    /**
     * A blank separator node in the tree.
     * @param {Object=} config The configuration for the tree. See
     *    goog.ui.tree.TreeControl.DefaultConfig. If not specified, a default config
     *    will be used.
     * @constructor
     * @extends {Blockly.Toolbox.TreeNode}
     */
    constructor(config?: Object);
  }

}

declare module Blockly.Tooltip {

  /**
   * Is a tooltip currently showing?
   */
  var visible: any /*missing*/;

  /**
   * Maximum width (in characters) of a tooltip.
   */
  var LIMIT: any /*missing*/;

  /**
   * PID of suspended thread to clear tooltip on mouse out.
   * @private
   */
  var mouseOutPid_: any /*missing*/;

  /**
   * PID of suspended thread to show the tooltip.
   * @private
   */
  var showPid_: any /*missing*/;

  /**
   * Last observed X location of the mouse pointer (freezes when tooltip appears).
   * @private
   */
  var lastX_: any /*missing*/;

  /**
   * Last observed Y location of the mouse pointer (freezes when tooltip appears).
   * @private
   */
  var lastY_: any /*missing*/;

  /**
   * Current element being pointed at.
   * @private
   */
  var element_: any /*missing*/;

  /**
   * Once a tooltip has opened for an element, that element is 'poisoned' and
   * cannot respawn a tooltip until the pointer moves over a different element.
   * @private
   */
  var poisonedElement_: any /*missing*/;

  /**
   * Horizontal offset between mouse cursor and tooltip.
   */
  var OFFSET_X: any /*missing*/;

  /**
   * Vertical offset between mouse cursor and tooltip.
   */
  var OFFSET_Y: any /*missing*/;

  /**
   * Radius mouse can move before killing tooltip.
   */
  var RADIUS_OK: any /*missing*/;

  /**
   * Delay before tooltip appears.
   */
  var HOVER_MS: any /*missing*/;

  /**
   * Horizontal padding between tooltip and screen edge.
   */
  var MARGINS: any /*missing*/;

  /**
   * The HTML container.  Set once by Blockly.Tooltip.createDom.
   * @type {Element}
   */
  var DIV: Element;

  /**
   * Create the tooltip div and inject it onto the page.
   */
  function createDom(): void;

  /**
   * Binds the required mouse events onto an SVG element.
   * @param {!Element} element SVG element onto which tooltip is to be bound.
   */
  function bindMouseEvents(element: Element): void;

  /**
   * Hide the tooltip if the mouse is over a different object.
   * Initialize the tooltip to potentially appear for this object.
   * @param {!Event} e Mouse event.
   * @private
   */
  function onMouseOver_(e: Event): void;

  /**
   * Hide the tooltip if the mouse leaves the object and enters the workspace.
   * @param {!Event} e Mouse event.
   * @private
   */
  function onMouseOut_(e: Event): void;

  /**
   * When hovering over an element, schedule a tooltip to be shown.  If a tooltip
   * is already visible, hide it if the mouse strays out of a certain radius.
   * @param {!Event} e Mouse event.
   * @private
   */
  function onMouseMove_(e: Event): void;

  /**
   * Hide the tooltip.
   */
  function hide(): void;

  /**
   * Create the tooltip and show it.
   * @private
   */
  function show_(): void;
}

declare module Blockly.Touch {

  /**
   * Which touch events are we currently paying attention to?
   * @type {DOMString}
   * @private
   */
  var touchIdentifier_: any;

  /**
   * Wrapper function called when a touch mouseUp occurs during a drag operation.
   * @type {Array.<!Array>}
   * @private
   */
  var onTouchUpWrapper_: any[][];

  /**
   * The TOUCH_MAP lookup dictionary specifies additional touch events to fire,
   * in conjunction with mouse events.
   * @type {Object}
   */
  var TOUCH_MAP: Object;

  /**
   * Clear the touch identifier that tracks which touch stream to pay attention
   * to.  This ends the current drag/gesture and allows other pointers to be
   * captured.
   */
  function clearTouchIdentifier(): void;

  /**
   * Decide whether Blockly should handle or ignore this event.
   * Mouse and touch events require special checks because we only want to deal
   * with one touch stream at a time.  All other events should always be handled.
   * @param {!Event} e The event to check.
   * @return {boolean} True if this event should be passed through to the
   *     registered handler; false if it should be blocked.
   */
  function shouldHandleEvent(e: Event): boolean;

  /**
   * Check whether the touch identifier on the event matches the current saved
   * identifier.  If there is no identifier, that means it's a mouse event and
   * we'll use the identifier "mouse".  This means we won't deal well with
   * multiple mice being used at the same time.  That seems okay.
   * If the current identifier was unset, save the identifier from the
   * event.  This starts a drag/gesture, during which touch events with other
   * identifiers will be silently ignored.
   * @param {!Event} e Mouse event or touch event.
   * @return {boolean} Whether the identifier on the event matches the current
   *     saved identifier.
   */
  function checkTouchIdentifier(e: Event): boolean;

  /**
   * Set an event's clientX and clientY from its first changed touch.  Use this to
   * make a touch event work in a mouse event handler.
   * @param {!Event} e A touch event.
   */
  function setClientFromTouch(e: Event): void;

  /**
   * Check whether a given event is a mouse or touch event.
   * @param {!Event} e An event.
   * @return {boolean} true if it is a mouse or touch event; false otherwise.
   */
  function isMouseOrTouchEvent(e: Event): boolean;

  /**
   * Split an event into an array of events, one per changed touch or mouse
   * point.
   * @param {!Event} e A mouse event or a touch event with one or more changed
   * touches.
   * @return {!Array.<!Event>} An array of mouse or touch events.  Each touch
   *     event will have exactly one changed touch.
   */
  function splitEventByTouches(e: Event): Event[];
}

declare module Blockly.getRelativeXY_ {

  /**
   * Static regex to pull the x,y values out of an SVG translate() directive.
   * Note that Firefox and IE (9,10) return 'translate(12)' instead of
   * 'translate(12, 0)'.
   * Note that IE (9,10) returns 'translate(16 8)' instead of 'translate(16, 8)'.
   * Note that IE has been reported to return scientific notation (0.123456e-42).
   * @type {!RegExp}
   * @private
   */
  var XY_REGEXP_: RegExp;
}

declare module Blockly.utils {

  /**
   * Parse a string with any number of interpolation tokens (%1, %2, ...).
   * '%' characters may be self-escaped (%%).
   * @param {string} message Text containing interpolation tokens.
   * @return {!Array.<string|number>} Array of strings and numbers.
   */
  function tokenizeInterpolation(message: string): string|number[];

  /**
   * Wrap text to the specified width.
   * @param {string} text Text to wrap.
   * @param {number} limit Width to wrap each line.
   * @return {string} Wrapped text.
   */
  function wrap(text: string, limit: number): string;

  /**
   * Wrap single line of text to the specified width.
   * @param {string} text Text to wrap.
   * @param {number} limit Width to wrap each line.
   * @return {string} Wrapped text.
   * @private
   */
  function wrap_line_(text: string, limit: number): string;

  /**
   * Compute a score for how good the wrapping is.
   * @param {!Array.<string>} words Array of each word.
   * @param {!Array.<boolean>} wordBreaks Array of line breaks.
   * @param {number} limit Width to wrap each line.
   * @return {number} Larger the better.
   * @private
   */
  function wrapScore_(words: string[], wordBreaks: boolean[], limit: number): number;

  /**
   * Mutate the array of line break locations until an optimal solution is found.
   * No line breaks are added or deleted, they are simply moved around.
   * @param {!Array.<string>} words Array of each word.
   * @param {!Array.<boolean>} wordBreaks Array of line breaks.
   * @param {number} limit Width to wrap each line.
   * @return {!Array.<boolean>} New array of optimal line breaks.
   * @private
   */
  function wrapMutate_(words: string[], wordBreaks: boolean[], limit: number): boolean[];

  /**
   * Reassemble the array of words into text, with the specified line breaks.
   * @param {!Array.<string>} words Array of each word.
   * @param {!Array.<boolean>} wordBreaks Array of line breaks.
   * @return {string} Plain text.
   * @private
   */
  function wrapToText_(words: string[], wordBreaks: boolean[]): string;
}

declare module Blockly.genUid {

  /**
   * Legal characters for the unique ID.  Should be all on a US keyboard.
   * No characters that conflict with XML or JSON.  Requests to remove additional
   * 'problematic' characters from this soup will be denied.  That's your failure
   * to properly escape in your own environment.  Issues #251, #625, #682.
   * @private
   */
  var soup_: any /*missing*/;
}

declare module Blockly.Variables {

  /**
   * Category to separate variable names from procedures and generated functions.
   */
  var NAME_TYPE: any /*missing*/;

  /**
   * Find all user-created variables that are in use in the workspace.
   * For use by generators.
   * @param {!Blockly.Block|!Blockly.Workspace} root Root block or workspace.
   * @return {!Array.<string>} Array of variable names.
   */
  function allUsedVariables(root: Blockly.Block|Blockly.Workspace): string[];

  /**
   * Find all variables that the user has created through the workspace or
   * toolbox.  For use by generators.
   * @param {!Blockly.Workspace} root The workspace to inspect.
   * @return {!Array.<string>} Array of variable names.
   */
  function allVariables(root: Blockly.Workspace): string[];

  /**
   * Construct the blocks required by the flyout for the variable category.
   * @param {!Blockly.Workspace} workspace The workspace contianing variables.
   * @return {!Array.<!Element>} Array of XML block elements.
   */
  function flyoutCategory(workspace: Blockly.Workspace): Element[];

  /**
   * Return a new variable name that is not yet being used. This will try to
   * generate single letter variable names in the range 'i' to 'z' to start with.
   * If no unique name is located it will try 'i' to 'z', 'a' to 'h',
   * then 'i2' to 'z2' etc.  Skip 'l'.
   * @param {!Blockly.Workspace} workspace The workspace to be unique in.
   * @return {string} New variable name.
   */
  function generateUniqueName(workspace: Blockly.Workspace): string;

  /**
   * Create a new variable on the given workspace.
   * @param {!Blockly.Workspace} workspace The workspace on which to create the
   *     variable.
   * @return {null|undefined|string} An acceptable new variable name, or null if
   *     change is to be aborted (cancel button), or undefined if an existing
   *     variable was chosen.
   */
  function createVariable(workspace: Blockly.Workspace): any /*null*/|any /*undefined*/|string;

  /**
   * Prompt the user for a new variable name.
   * @param {string} promptText The string of the prompt.
   * @param {string} defaultText The default value to show in the prompt's field.
   * @return {?string} The new variable name, or null if the user picked
   *     something illegal.
   */
  function promptName(promptText: string, defaultText: string): string;
}



declare module Blockly.Warning {

  /**
   * Create the text for the warning's bubble.
   * @param {string} text The text to display.
   * @return {!SVGTextElement} The top-level node of the text.
   * @private
   */
  function textToDom_(text: string): SVGTextElement;
}

declare module Blockly.WidgetDiv {

  /**
   * The HTML container.  Set once by Blockly.WidgetDiv.createDom.
   * @type {Element}
   */
  var DIV: Element;

  /**
   * The object currently using this container.
   * @type {Object}
   * @private
   */
  var owner_: Object;

  /**
   * Optional cleanup function set by whichever object uses the widget.
   * @type {Function}
   * @private
   */
  var dispose_: Function;

  /**
   * Create the widget div and inject it onto the page.
   */
  function createDom(): void;

  /**
   * Initialize and display the widget div.  Close the old one if needed.
   * @param {!Object} newOwner The object that will be using this container.
   * @param {boolean} rtl Right-to-left (true) or left-to-right (false).
   * @param {Function} dispose Optional cleanup function to be run when the widget
   *   is closed.
   */
  function show(newOwner: Object, rtl: boolean, dispose: Function): void;

  /**
   * Destroy the widget and hide the div.
   */
  function hide(): void;

  /**
   * Is the container visible?
   * @return {boolean} True if visible.
   */
  function isVisible(): boolean;

  /**
   * Destroy the widget and hide the div if it is being used by the specified
   *   object.
   * @param {!Object} oldOwner The object that was using this container.
   */
  function hideIfOwner(oldOwner: Object): void;

  /**
   * Position the widget at a given location.  Prevent the widget from going
   * offscreen top or left (right in RTL).
   * @param {number} anchorX Horizontal location (window coorditates, not body).
   * @param {number} anchorY Vertical location (window coorditates, not body).
   * @param {!goog.math.Size} windowSize Height/width of window.
   * @param {!goog.math.Coordinate} scrollOffset X/y of window scrollbars.
   * @param {boolean} rtl True if RTL, false if LTR.
   */
  function position(anchorX: number, anchorY: number, windowSize: goog.math.Size, scrollOffset: goog.math.Coordinate, rtl: boolean): void;
}



declare module Blockly.Workspace {

  /**
   * Angle away from the horizontal to sweep for blocks.  Order of execution is
   * generally top to bottom, but a small angle changes the scan to give a bit of
   * a left to right bias (reversed in RTL).  Units are in degrees.
   * See: http://tvtropes.org/pmwiki/pmwiki.php/Main/DiagonalBilling.
   */
  var SCAN_ANGLE: any /*missing*/;

  /**
   * Database of all workspaces.
   * @private
   */
  var WorkspaceDB_: any /*missing*/;

  /**
   * Find the workspace with the specified ID.
   * @param {string} id ID of workspace to find.
   * @return {Blockly.Workspace} The sought after workspace or null if not found.
   */
  function getById(id: string): Blockly.Workspace;
}



declare module Blockly.WorkspaceSvg {

  /**
   * Return an object with all the metrics required to size scrollbars for a
   * top level workspace.  The following properties are computed:
   * .viewHeight: Height of the visible rectangle,
   * .viewWidth: Width of the visible rectangle,
   * .contentHeight: Height of the contents,
   * .contentWidth: Width of the content,
   * .viewTop: Offset of top edge of visible rectangle from parent,
   * .viewLeft: Offset of left edge of visible rectangle from parent,
   * .contentTop: Offset of the top-most content from the y=0 coordinate,
   * .contentLeft: Offset of the left-most content from the x=0 coordinate.
   * .absoluteTop: Top-edge of view.
   * .absoluteLeft: Left-edge of view.
   * .toolboxWidth: Width of toolbox, if it exists.  Otherwise zero.
   * .toolboxHeight: Height of toolbox, if it exists.  Otherwise zero.
   * .flyoutWidth: Width of the flyout if it is always open.  Otherwise zero.
   * .flyoutHeight: Height of flyout if it is always open.  Otherwise zero.
   * .toolboxPosition: Top, bottom, left or right.
   * @return {!Object} Contains size and position metrics of a top level
   *   workspace.
   * @private
   * @this Blockly.WorkspaceSvg
   */
  function getTopLevelWorkspaceMetrics_(): Object;

  /**
   * Sets the X/Y translations of a top level workspace to match the scrollbars.
   * @param {!Object} xyRatio Contains an x and/or y property which is a float
   *     between 0 and 1 specifying the degree of scrolling.
   * @private
   * @this Blockly.WorkspaceSvg
   */
  function setTopLevelWorkspaceMetrics_(xyRatio: Object): void;
}

declare module Blockly.Xml {

  /**
   * Encode a block tree as XML.
   * @param {!Blockly.Workspace} workspace The workspace containing blocks.
   * @param {boolean} opt_noId True if the encoder should skip the block ids.
   * @return {!Element} XML document.
   */
  function workspaceToDom(workspace: Blockly.Workspace, opt_noId: boolean): Element;

  /**
   * Encode a block subtree as XML with XY coordinates.
   * @param {!Blockly.Block} block The root block to encode.
   * @param {boolean} opt_noId True if the encoder should skip the block id.
   * @return {!Element} Tree of XML elements.
   */
  function blockToDomWithXY(block: Blockly.Block, opt_noId: boolean): Element;

  /**
   * Encode a block subtree as XML.
   * @param {!Blockly.Block} block The root block to encode.
   * @param {boolean} opt_noId True if the encoder should skip the block id.
   * @return {!Element} Tree of XML elements.
   */
  function blockToDom(block: Blockly.Block, opt_noId: boolean): Element;

  /**
   * Deeply clone the shadow's DOM so that changes don't back-wash to the block.
   * @param {!Element} shadow A tree of XML elements.
   * @return {!Element} A tree of XML elements.
   * @private
   */
  function cloneShadow_(shadow: Element): Element;

  /**
   * Converts a DOM structure into plain text.
   * Currently the text format is fairly ugly: all one line with no whitespace.
   * @param {!Element} dom A tree of XML elements.
   * @return {string} Text representation.
   */
  function domToText(dom: Element): string;

  /**
   * Converts a DOM structure into properly indented text.
   * @param {!Element} dom A tree of XML elements.
   * @return {string} Text representation.
   */
  function domToPrettyText(dom: Element): string;

  /**
   * Converts plain text into a DOM structure.
   * Throws an error if XML doesn't parse.
   * @param {string} text Text representation.
   * @return {!Element} A tree of XML elements.
   */
  function textToDom(text: string): Element;

  /**
   * Decode an XML DOM and create blocks on the workspace.
   * @param {!Element} xml XML DOM.
   * @param {!Blockly.Workspace} workspace The workspace.
   */
  function domToWorkspace(xml: Element, workspace: Blockly.Workspace): void;

  /**
   * Decode an XML block tag and create a block (and possibly sub blocks) on the
   * workspace.
   * @param {!Element} xmlBlock XML block element.
   * @param {!Blockly.Workspace} workspace The workspace.
   * @return {!Blockly.Block} The root block created.
   */
  function domToBlock(xmlBlock: Element, workspace: Blockly.Workspace): Blockly.Block;

  /**
   * Decode an XML block tag and create a block (and possibly sub blocks) on the
   * workspace.
   * @param {!Element} xmlBlock XML block element.
   * @param {!Blockly.Workspace} workspace The workspace.
   * @return {!Blockly.Block} The root block created.
   * @private
   */
  function domToBlockHeadless_(xmlBlock: Element, workspace: Blockly.Workspace): Blockly.Block;

  /**
   * Remove any 'next' block (statements in a stack).
   * @param {!Element} xmlBlock XML block element.
   */
  function deleteNext(xmlBlock: Element): void;
}


