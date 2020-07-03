/**
 * @module M/plugin/Transparency
 */
import 'assets/css/transparency';
import TransparencyControl from './transparencycontrol';
import api from '../../api';
import { getValue } from './i18n/language';
// import { isArray } from '../../../../../facade/js/util/Utils';

export default class Transparency extends M.Plugin {
  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * object which has an implementation Object
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Object} impl implementation object
   * @api stable
   */
  constructor(options = {}) {
    super();

    /**
     * Name plugin
     * @private
     * @type {String}
     */
    this.name_ = 'transparency';

    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.map_ = null;

    /**
     * Array of controls
     * @private
     * @type {Array<M.Control>}
     */
    this.controls_ = [];

    /**
     * Class name of the html view Plugin
     * @public
     * @type {string}
     */
    this.className = 'm-plugin-transparency';

    /**
     * Position of the Plugin
     * @public
     * Posible values: TR | TL | BL | BR
     * @type {String}
     */
    const positions = ['TR', 'TL', 'BL', 'BR'];
    this.position = positions.includes(options.position) ? options.position : 'TR';

    /**
     * Layer names that will have effects
     * @public
     * Value: the names separated with coma
     * @type {string}
     */
    if (options.layers === undefined || options.layers === '') {
      M.dialog.error(getValue('errorLayer'));
      this.layers = [];
    } else {
      if (Array.isArray(options.layers)) {
        this.layers = options.layers;
      } else {
        this.layers = options.layers.split(",");
      }
    }

    /**
     * Transparent effect radius
     * Value: number in range 30 - 200
     * @type {number}
     * @public
     */

    if (!isNaN(parseInt(options.radius))) {

      if (options.radius >= 30 && options.radius <= 200) {
        this.radius = parseInt(options.radius);
      } else if (options.radius > 200) {
        this.radius = 200;
      } else if (options.radius < 30) {
        this.radius = 30;
      }

    } else {
      this.radius = 100; // Default value
    }

    /**
     * Enable/disable border
     * @type {boolean}
     * @public
     */
    this.border = options.border;
    if (this.border === undefined) {
      this.border = true;
    }
    
    /**
     * Radius border color
     * Value: color value
     * @type {string}
     * @public
     */
    this.borderColor = options.borderColor || 'white';
    
    /**
     * Metadata from api.json
     * @private
     * @type {Object}
     */
    this.metadata_ = api.metadata;

    this.separatorApiJson = api.url.separator;

    /**
     *@private
     *@type { string }
     */
    this.tooltip_ = options.tooltip || getValue('tooltip');
  }

  /**
   * This function adds this plugin into the map
   *
   * @public
   * @function
   * @param {M.Map} map the map to add the plugin
   * @api stable
   */
  addTo(map) {
    const pluginOnLeft = !!(['TL', 'BL'].includes(this.position));

    const values = {
      pluginOnLeft,
      layers: this.layers,
      radius: this.radius,
      border: this.border,
      borderColor: this.borderColor,
    };
    this.control_ = new TransparencyControl(values);
    this.controls_.push(this.control_);
    this.map_ = map;
    this.panel_ = new M.ui.Panel('panelTransparency', {
      collapsible: true,
      position: M.ui.position[this.position],
      className: this.className,
      collapsedButtonClass: 'g-cartografia-gps4',
      tooltip: this.tooltip_,
    });
    this.panel_.addControls(this.controls_);
    map.addPanels(this.panel_);
  }


  /**
   * This function destroys this plugin
   *
   * @public
   * @function
   * @api stable
   */
  destroy() {
    this.control_.removeEffects();
    this.control_.removeTransparencyLayers(this.control_.getLayersNames());
    this.map_.removeControls([this.control_]);
    [this.control_, this.panel_, this.map_, this.layers, this.radius, this.border, this.borderColor] = [null, null, null, null, null, null, null];
  }

  /**
   * This function gets name plugin
   * @getter
   * @public
   * @returns {string}
   * @api stable
   */
  get name() {
    return this.name_;
  }

  /**
   * This function gets metadata plugin
   *
   * @public
   * @getter
   * @api stable
   * @return {Object}
   */
  getMetadata() {
    return this.metadata_;
  }

  /**
   * Get the API REST Parameters of the plugin
   *
   * @function
   * @public
   * @api
   */
  getAPIRest() {
    let layersTransparency = this.control_.getLayersNames();

    return `${this.name}=${this.position}${this.separatorApiJson}${layersTransparency.join(',')}${this.separatorApiJson}${this.radius}${this.separatorApiJson}${this.border}${this.separatorApiJson}${this.borderColor}`;
  }

  /**
   * Activate plugin
   *
   * @function
   * @public
   * @api
   */
  activate() {
    this.control_.activate();
  }

  /**
   * Desactivate plugin
   *
   * @function
   * @public
   * @api
   */
  deactivate() {
    this.control_.deactivate();
  }

  /**
   * This
   function compare
   if pluging recieved by param is instance of M.plugin.Transparency
   *
   * @public
   * @function
   * @param {M.plugin} plugin to compare
   * @api stable
   */
  equals(plugin) {
    if (plugin instanceof Transparency) {
      return true;
    }
    return false;
  }
}
