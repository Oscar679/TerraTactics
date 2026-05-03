
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @class
 * @classdesc
 * 
 * UI class for switching attacks.
 */
TerraTactics.scene.Attacks = function (x, y, weapon, onClick) {
    /**
     * @type {HTMLDivElement}
     * @private
     */
    this.m_element = document.createElement("div");
    this.m_element.className = "weapon-button " + weapon;
    this.m_element.id = weapon;
    this.m_element.style.position = "absolute";
    this.m_element.style.left = x + "px";
    this.m_element.style.top = y + "px";
    this.m_element.style.width = "30px"; // Example size, adjust as needed
    this.m_element.style.height = "30px"; // Example size, adjust as needed
    this.m_element.style.backgroundColor = "gray"; // Example background, replace with actual styling
    this.m_element.style.color = "white";
    this.m_element.style.textAlign = "center";
    this.m_element.style.lineHeight = "30px";
    this.m_element.textContent = weapon.charAt(0).toUpperCase(); // Display first letter of weapon

    document.body.appendChild(this.m_element); // Add to the DOM

    //remove global window event listeners
    this.m_element.addEventListener("mousedown", function (event) {
        event.stopPropagation();
    });

    this.m_element.addEventListener("mouseup", function (event) {
        event.stopPropagation();
    });

    this.m_element.addEventListener("click", function (event) {
        event.stopPropagation();
        onClick(weapon);
    });
};